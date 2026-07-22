import { GetSectionRequest, GetSectionResult, MarkdownSection } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { isOversized, MAX_TEXT_BYTES, normalizeHeading, parseCard, splitSections } from './lib';

/**
 * Look up one named Markdown section's content by heading, e.g. "Intended
 * uses & limitations" or "Training data" — the node an agent uses to pull
 * exactly one part of a model card. Matching is case-insensitive and
 * whitespace/markup-normalized; an exact normalized match wins, otherwise
 * the first heading that contains the requested heading as a substring.
 * found is false when no section matches.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function getSection(ax: AxiomContext, input: GetSectionRequest): GetSectionResult {
  const out = new GetSectionResult();
  const text = input.getText();
  if (isOversized(text)) {
    out.setError(`input exceeds ${MAX_TEXT_BYTES} bytes`);
    return out;
  }
  const parsed = parseCard(text);
  const { sections } = splitSections(parsed.body);
  const wanted = normalizeHeading(input.getHeading());
  if (!wanted) {
    out.setFound(false);
    return out;
  }
  let match = sections.find((s) => normalizeHeading(s.heading) === wanted);
  if (!match) match = sections.find((s) => normalizeHeading(s.heading).includes(wanted));
  if (!match) {
    out.setFound(false);
    return out;
  }
  const m = new MarkdownSection();
  m.setLevel(match.level);
  m.setHeading(match.heading);
  m.setContent(match.content);
  out.setFound(true);
  out.setSection(m);
  return out;
}

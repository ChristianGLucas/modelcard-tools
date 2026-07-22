import { ModelCard, AuditCompletenessResult, SectionPresence } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { isOversized, MAX_TEXT_BYTES, normalizeHeading, parseCard, splitSections, STANDARD_SECTIONS } from './lib';

/**
 * Audit a card's Markdown body against the standard Hugging Face model-card
 * template sections (Model Details, Intended Uses & Limitations, How to Get
 * Started, Training Data, Training Procedure, Evaluation, Bias/Risks/
 * Limitations, Environmental Impact, Citation) — a completeness/quality
 * check for card authoring or review. A standard section counts as present
 * when any of its heading aliases appears as a substring of a body heading
 * (case-insensitive, markup-normalized).
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function auditCompleteness(ax: AxiomContext, input: ModelCard): AuditCompletenessResult {
  const out = new AuditCompletenessResult();
  const text = input.getText();
  if (isOversized(text)) {
    out.setError(`input exceeds ${MAX_TEXT_BYTES} bytes`);
    return out;
  }
  const parsed = parseCard(text);
  const { sections } = splitSections(parsed.body);
  const normalizedHeadings = sections.map((s) => ({ raw: s.heading, norm: normalizeHeading(s.heading) }));

  let presentCount = 0;
  const rows = STANDARD_SECTIONS.map((std) => {
    const hit = normalizedHeadings.find((h) => std.aliases.some((alias) => h.norm.includes(alias)));
    const p = new SectionPresence();
    p.setStandardSection(std.name);
    p.setPresent(!!hit);
    if (hit) {
      p.setMatchedHeading(hit.raw);
      presentCount += 1;
    }
    return p;
  });

  out.setSectionsList(rows);
  out.setPresentCount(presentCount);
  out.setTotalCount(STANDARD_SECTIONS.length);
  out.setCompletenessRatio(STANDARD_SECTIONS.length > 0 ? presentCount / STANDARD_SECTIONS.length : 0);
  return out;
}

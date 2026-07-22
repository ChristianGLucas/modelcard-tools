import { ModelCard, ExtractSectionsResult, MarkdownSection } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { isOversized, MAX_TEXT_BYTES, parseCard, splitSections } from './lib';

/**
 * Extract the Markdown body's sections as (level, heading, content) triples
 * — content runs up to (but not including) the next ATX heading (`#` through
 * `######`) of any level, so nested subsections are their own entries too.
 * Frontmatter is stripped first if present. preamble carries any text before
 * the first heading (title/badges block). A body with no headings comes back
 * with an empty sections list and the whole body as preamble.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function extractSections(ax: AxiomContext, input: ModelCard): ExtractSectionsResult {
  const out = new ExtractSectionsResult();
  const text = input.getText();
  if (isOversized(text)) {
    out.setError(`input exceeds ${MAX_TEXT_BYTES} bytes`);
    return out;
  }
  const parsed = parseCard(text);
  const { preamble, sections } = splitSections(parsed.body);
  out.setPreamble(preamble);
  out.setSectionsList(
    sections.map((s) => {
      const m = new MarkdownSection();
      m.setLevel(s.level);
      m.setHeading(s.heading);
      m.setContent(s.content);
      return m;
    }),
  );
  return out;
}

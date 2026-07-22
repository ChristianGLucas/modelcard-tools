import { ModelCard, ParseFrontmatterResult, FrontmatterEntry } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { isOversized, MAX_TEXT_BYTES, parseCard, safeJsonStringify } from './lib';

/**
 * Parse a card's YAML frontmatter into a normalized structure: one
 * FrontmatterEntry per top-level key, each carrying its value JSON-encoded
 * so any YAML shape (scalar, list, nested mapping) round-trips without
 * forcing every card into one rigid schema. Use the more specific
 * ExtractLicense/ExtractTags/etc. nodes when you only need one well-known
 * field. valid is false (with parse_error set) when a frontmatter block was
 * found but is not valid YAML.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function parseFrontmatter(ax: AxiomContext, input: ModelCard): ParseFrontmatterResult {
  const out = new ParseFrontmatterResult();
  const text = input.getText();
  if (isOversized(text)) {
    out.setError(`input exceeds ${MAX_TEXT_BYTES} bytes`);
    return out;
  }
  const parsed = parseCard(text);
  out.setHasFrontmatter(parsed.hasFrontmatter);
  out.setValid(parsed.hasFrontmatter && parsed.valid);
  out.setParseError(parsed.parseError);
  if (parsed.hasFrontmatter && parsed.valid) {
    out.setEntriesList(
      Object.keys(parsed.data).map((key) => {
        const e = new FrontmatterEntry();
        e.setKey(key);
        e.setValueJson(safeJsonStringify(parsed.data[key]));
        return e;
      }),
    );
  }
  return out;
}

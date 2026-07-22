import { ModelCard, SplitCardResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { isOversized, MAX_TEXT_BYTES, parseCard } from './lib';

/**
 * Split a model/dataset card's raw text into its `---`-fenced YAML
 * frontmatter and its Markdown body. A missing frontmatter block is not an
 * error — has_frontmatter is simply false and body is the whole input. A
 * frontmatter block that fails to parse as YAML, or exceeds the 64 KiB
 * frontmatter size bound, sets frontmatter_parse_error with a message
 * instead of aborting; body still comes back (as the whole input, fences
 * included, when the frontmatter could not be isolated). Only oversized
 * whole-input text (over 1 MiB) sets the top-level error.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function splitCard(ax: AxiomContext, input: ModelCard): SplitCardResult {
  const out = new SplitCardResult();
  const text = input.getText();
  if (isOversized(text)) {
    out.setError(`input exceeds ${MAX_TEXT_BYTES} bytes`);
    return out;
  }
  const parsed = parseCard(text);
  out.setHasFrontmatter(parsed.hasFrontmatter);
  out.setFrontmatterRaw(parsed.hasFrontmatter ? textFrontmatterRaw(text) : '');
  out.setBody(parsed.body);
  out.setFrontmatterParseError(parsed.hasFrontmatter && !parsed.valid);
  out.setParseErrorMessage(parsed.parseError);
  return out;
}

// Re-extract the raw (unparsed) frontmatter text for the response — kept
// separate from parseCard's YAML-parsed `data` so a parse failure still
// returns the raw block the caller can inspect.
function textFrontmatterRaw(text: string): string {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  return m ? m[1] : '';
}

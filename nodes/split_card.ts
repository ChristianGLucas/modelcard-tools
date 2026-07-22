import { ModelCard, SplitCardResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { isOversized, MAX_TEXT_BYTES, parseCard, splitFrontmatterRaw } from './lib';

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
  // Re-derive the raw (unparsed) frontmatter block via the same
  // splitFrontmatterRaw helper parseCard itself starts from (rather than a
  // second regex), so both agree on BOM-handling and fence-matching by
  // construction instead of by two implementations staying in sync.
  const rawSplit = splitFrontmatterRaw(text);
  out.setHasFrontmatter(parsed.hasFrontmatter);
  out.setFrontmatterRaw(parsed.hasFrontmatter ? rawSplit.frontmatterRaw : '');
  out.setBody(parsed.body);
  out.setFrontmatterParseError(parsed.hasFrontmatter && !parsed.valid);
  out.setParseErrorMessage(parsed.parseError);
  return out;
}

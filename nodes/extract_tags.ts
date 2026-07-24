import { ModelCard, ExtractTagsResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { parseCard, toStringArray } from './lib';

/**
 * Extract a card's `tags` list from its frontmatter. Empty (not an error)
 * when the card has no frontmatter, the frontmatter fails to parse, or
 * `tags` is absent.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function extractTags(ax: AxiomContext, input: ModelCard): ExtractTagsResult {
  const out = new ExtractTagsResult();
  const text = input.getText();
  const parsed = parseCard(text);
  if (!parsed.hasFrontmatter || !parsed.valid) return out;
  out.setTagsList(toStringArray(parsed.data.tags));
  return out;
}

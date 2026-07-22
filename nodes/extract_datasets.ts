import { ModelCard, ExtractDatasetsResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { isOversized, MAX_TEXT_BYTES, parseCard, toStringArray } from './lib';

/**
 * Extract a model card's `datasets` field — the dataset(s) it declares it
 * was trained/fine-tuned/evaluated on — normalized to a flat list
 * regardless of whether the frontmatter wrote a single scalar or a YAML
 * sequence.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function extractDatasets(ax: AxiomContext, input: ModelCard): ExtractDatasetsResult {
  const out = new ExtractDatasetsResult();
  const text = input.getText();
  if (isOversized(text)) {
    out.setError(`input exceeds ${MAX_TEXT_BYTES} bytes`);
    return out;
  }
  const parsed = parseCard(text);
  if (!parsed.hasFrontmatter || !parsed.valid) return out;
  out.setDatasetsList(toStringArray(parsed.data.datasets));
  return out;
}

import { ModelCard, ExtractPipelineTagResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { isOversized, isPresent, MAX_TEXT_BYTES, parseCard, toStringOrEmpty } from './lib';

/**
 * Extract a model card's `pipeline_tag` — the task type (e.g.
 * "text-generation", "image-classification") the model is tagged for on the
 * Hugging Face Hub. present is false when the key is absent.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function extractPipelineTag(ax: AxiomContext, input: ModelCard): ExtractPipelineTagResult {
  const out = new ExtractPipelineTagResult();
  const text = input.getText();
  if (isOversized(text)) {
    out.setError(`input exceeds ${MAX_TEXT_BYTES} bytes`);
    return out;
  }
  const parsed = parseCard(text);
  if (!parsed.hasFrontmatter || !parsed.valid) return out;
  const present = isPresent(parsed.data.pipeline_tag);
  out.setPresent(present);
  if (present) out.setPipelineTag(toStringOrEmpty(parsed.data.pipeline_tag));
  return out;
}

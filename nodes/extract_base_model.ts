import { ModelCard, ExtractBaseModelResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { parseCard, toStringArray } from './lib';

/**
 * Extract a model card's `base_model` field(s) — the upstream model(s) this
 * one was fine-tuned, quantized, merged, or adapted from — normalized to a
 * flat list regardless of whether the frontmatter wrote a single scalar or
 * a YAML sequence.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function extractBaseModel(ax: AxiomContext, input: ModelCard): ExtractBaseModelResult {
  const out = new ExtractBaseModelResult();
  const text = input.getText();
  const parsed = parseCard(text);
  if (!parsed.hasFrontmatter || !parsed.valid) return out;
  out.setBaseModelsList(toStringArray(parsed.data.base_model));
  return out;
}

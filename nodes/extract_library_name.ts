import { ModelCard, ExtractLibraryNameResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { isOversized, isPresent, MAX_TEXT_BYTES, parseCard, toStringOrEmpty } from './lib';

/**
 * Extract a model card's `library_name` — the inference/training library it
 * declares (e.g. "transformers", "diffusers", "timm"). present is false
 * when the key is absent.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function extractLibraryName(ax: AxiomContext, input: ModelCard): ExtractLibraryNameResult {
  const out = new ExtractLibraryNameResult();
  const text = input.getText();
  if (isOversized(text)) {
    out.setError(`input exceeds ${MAX_TEXT_BYTES} bytes`);
    return out;
  }
  const parsed = parseCard(text);
  if (!parsed.hasFrontmatter || !parsed.valid) return out;
  const present = isPresent(parsed.data.library_name);
  out.setPresent(present);
  if (present) out.setLibraryName(toStringOrEmpty(parsed.data.library_name));
  return out;
}

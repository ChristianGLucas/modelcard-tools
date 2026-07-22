import { ModelCard, DetectCardTypeResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { detectCardType as classify, isOversized, MAX_TEXT_BYTES, parseCard } from './lib';

/**
 * Classify a card as a MODEL card or a DATASET card from its frontmatter
 * keys — model signals are pipeline_tag/model-index/base_model/library_name;
 * dataset signals are task_categories/dataset_info/size_categories/configs/
 * source_datasets. card_type is "unknown" when no frontmatter is present, it
 * fails to parse, or neither signal set is present. signals lists exactly
 * which keys drove the classification.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function detectCardType(ax: AxiomContext, input: ModelCard): DetectCardTypeResult {
  const out = new DetectCardTypeResult();
  const text = input.getText();
  if (isOversized(text)) {
    out.setError(`input exceeds ${MAX_TEXT_BYTES} bytes`);
    return out;
  }
  const parsed = parseCard(text);
  if (!parsed.hasFrontmatter || !parsed.valid) {
    out.setCardType('unknown');
    return out;
  }
  const { cardType, signals } = classify(parsed.data);
  out.setCardType(cardType);
  out.setSignalsList(signals);
  return out;
}

import { ModelCard, SummarizeCardResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { detectCardType, flattenModelIndex, isOversized, isPresent, MAX_TEXT_BYTES, normalizeModelIndex, parseCard, splitSections, toStringArray, wordCount } from './lib';

/**
 * Summarize a card's metadata at a glance: card type, frontmatter key
 * count, tag/language/section counts, body word count, and boolean flags
 * for license/eval-results/widget-examples/carbon-footprint presence — a
 * cheap single-call overview before pulling any individual field.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function summarizeCard(ax: AxiomContext, input: ModelCard): SummarizeCardResult {
  const out = new SummarizeCardResult();
  const text = input.getText();
  if (isOversized(text)) {
    out.setError(`input exceeds ${MAX_TEXT_BYTES} bytes`);
    return out;
  }
  const parsed = parseCard(text);
  out.setHasFrontmatter(parsed.hasFrontmatter);
  out.setFrontmatterValid(parsed.hasFrontmatter && parsed.valid);

  const { sections } = splitSections(parsed.body);
  out.setSectionCount(sections.length);
  out.setBodyWordCount(wordCount(parsed.body));

  if (parsed.hasFrontmatter && parsed.valid) {
    out.setFrontmatterKeyCount(Object.keys(parsed.data).length);
    out.setCardType(detectCardType(parsed.data).cardType);
    out.setTagCount(toStringArray(parsed.data.tags).length);
    out.setLanguageCount(toStringArray(parsed.data.language).length);
    out.setHasLicense(isPresent(parsed.data.license));
    const modelIndex = (parsed.data as Record<string, unknown>)['model-index'];
    out.setHasEvalResults(modelIndex !== undefined && flattenModelIndex(normalizeModelIndex(modelIndex)).length > 0);
    out.setHasWidgetExamples(Array.isArray(parsed.data.widget) && parsed.data.widget.length > 0);
    out.setHasCarbonFootprint(parsed.data.co2_eq_emissions !== undefined);
  } else {
    out.setCardType('unknown');
  }
  return out;
}

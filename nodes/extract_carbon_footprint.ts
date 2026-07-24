import { ModelCard, ExtractCarbonFootprintResult, CarbonFootprint } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { parseCard, safeJsonStringify, toStringOrEmpty } from './lib';

/**
 * Extract a model card's `co2_eq_emissions` carbon-footprint metadata.
 * Handles both shapes seen in the wild: a bare number (grams CO2 eq.) and
 * the structured object (emissions/source/training_type/
 * geographical_location/hardware_used). raw_json preserves the original
 * value for fidelity beyond the normalized fields. present is false when
 * the key is absent.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function extractCarbonFootprint(ax: AxiomContext, input: ModelCard): ExtractCarbonFootprintResult {
  const out = new ExtractCarbonFootprintResult();
  const text = input.getText();
  const parsed = parseCard(text);
  if (!parsed.hasFrontmatter || !parsed.valid) return out;
  const raw = parsed.data.co2_eq_emissions;
  if (raw === undefined) {
    out.setPresent(false);
    return out;
  }
  out.setPresent(true);
  const fp = new CarbonFootprint();
  if (typeof raw === 'number' && Number.isFinite(raw)) {
    fp.setEmissionsGrams(raw);
    fp.setEmissionsNumeric(true);
  } else if (raw && typeof raw === 'object') {
    const obj = raw as Record<string, unknown>;
    const em = obj.emissions;
    if (typeof em === 'number' && Number.isFinite(em)) {
      fp.setEmissionsGrams(em);
      fp.setEmissionsNumeric(true);
    }
    fp.setSource(toStringOrEmpty(obj.source));
    fp.setTrainingType(toStringOrEmpty(obj.training_type));
    fp.setGeographicalLocation(toStringOrEmpty(obj.geographical_location));
    fp.setHardwareUsed(toStringOrEmpty(obj.hardware_used));
  }
  fp.setRawJson(safeJsonStringify(raw));
  out.setFootprint(fp);
  return out;
}

import { ModelCard } from '../gen/messages_pb';
import { extractCarbonFootprint } from './extract_carbon_footprint';
import { ctx, MODEL_CARD, MODEL_CARD_ORACLE, NO_FRONTMATTER_CARD } from './testkit';

describe('ExtractCarbonFootprint', () => {
  it('extracts the structured co2_eq_emissions object, matching the hand-derived oracle', () => {
    const input = new ModelCard();
    input.setText(MODEL_CARD);
    const result = extractCarbonFootprint(ctx, input);
    expect(result.getPresent()).toBe(true);
    const fp = result.getFootprint()!;
    expect(fp.getEmissionsGrams()).toBeCloseTo(MODEL_CARD_ORACLE.carbon.emissionsGrams);
    expect(fp.getEmissionsNumeric()).toBe(true);
    expect(fp.getSource()).toBe(MODEL_CARD_ORACLE.carbon.source);
    expect(fp.getTrainingType()).toBe(MODEL_CARD_ORACLE.carbon.trainingType);
    expect(fp.getGeographicalLocation()).toBe(MODEL_CARD_ORACLE.carbon.geographicalLocation);
    expect(fp.getHardwareUsed()).toBe(MODEL_CARD_ORACLE.carbon.hardwareUsed);
    const raw = JSON.parse(fp.getRawJson());
    expect(raw.emissions).toBeCloseTo(MODEL_CARD_ORACLE.carbon.emissionsGrams);
  });

  it('handles the bare-number co2_eq_emissions shape', () => {
    const input = new ModelCard();
    input.setText('---\nco2_eq_emissions: 42.5\n---\nbody\n');
    const result = extractCarbonFootprint(ctx, input);
    expect(result.getPresent()).toBe(true);
    const fp = result.getFootprint()!;
    expect(fp.getEmissionsGrams()).toBeCloseTo(42.5);
    expect(fp.getEmissionsNumeric()).toBe(true);
    expect(fp.getSource()).toBe('');
  });

  it('present=false, not an error, when absent', () => {
    const input = new ModelCard();
    input.setText(NO_FRONTMATTER_CARD);
    const result = extractCarbonFootprint(ctx, input);
    expect(result.getPresent()).toBe(false);
    expect(result.getError()).toBe('');
  });
});

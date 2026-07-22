import { ModelCard } from '../gen/messages_pb';
import { extractDatasets } from './extract_datasets';
import { ctx, MODEL_CARD, MODEL_CARD_ORACLE, NO_FRONTMATTER_CARD } from './testkit';

describe('ExtractDatasets', () => {
  it('extracts the datasets list, order preserved', () => {
    const input = new ModelCard();
    input.setText(MODEL_CARD);
    const result = extractDatasets(ctx, input);
    expect(result.getDatasetsList()).toEqual(MODEL_CARD_ORACLE.datasets);
  });

  it('returns an empty list when absent', () => {
    const input = new ModelCard();
    input.setText(NO_FRONTMATTER_CARD);
    const result = extractDatasets(ctx, input);
    expect(result.getDatasetsList()).toHaveLength(0);
  });
});

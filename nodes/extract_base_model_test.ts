import { ModelCard } from '../gen/messages_pb';
import { extractBaseModel } from './extract_base_model';
import { ctx, MODEL_CARD, MODEL_CARD_ORACLE, NO_FRONTMATTER_CARD } from './testkit';

describe('ExtractBaseModel', () => {
  it('extracts a YAML-sequence base_model list', () => {
    const input = new ModelCard();
    input.setText(MODEL_CARD);
    const result = extractBaseModel(ctx, input);
    expect(result.getBaseModelsList()).toEqual(MODEL_CARD_ORACLE.baseModels);
  });

  it('normalizes a single scalar base_model to a one-element list', () => {
    const input = new ModelCard();
    input.setText('---\nbase_model: some-org/some-base\n---\nbody\n');
    const result = extractBaseModel(ctx, input);
    expect(result.getBaseModelsList()).toEqual(['some-org/some-base']);
  });

  it('returns an empty list when absent', () => {
    const input = new ModelCard();
    input.setText(NO_FRONTMATTER_CARD);
    const result = extractBaseModel(ctx, input);
    expect(result.getBaseModelsList()).toHaveLength(0);
  });
});

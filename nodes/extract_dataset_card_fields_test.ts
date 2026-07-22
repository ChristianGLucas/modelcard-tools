import { ModelCard } from '../gen/messages_pb';
import { extractDatasetCardFields } from './extract_dataset_card_fields';
import { ctx, DATASET_CARD, DATASET_CARD_ORACLE, MODEL_CARD, NO_FRONTMATTER_CARD } from './testkit';

describe('ExtractDatasetCardFields', () => {
  it('extracts task_categories, size_categories, language, and dataset_info from a dataset card', () => {
    const input = new ModelCard();
    input.setText(DATASET_CARD);
    const result = extractDatasetCardFields(ctx, input);
    expect(result.getTaskCategoriesList()).toEqual(DATASET_CARD_ORACLE.taskCategories);
    expect(result.getSizeCategoriesList()).toEqual(DATASET_CARD_ORACLE.sizeCategories);
    expect(result.getLanguagesList()).toEqual(DATASET_CARD_ORACLE.languages);
    expect(result.getHasDatasetInfo()).toBe(true);
    const info = JSON.parse(result.getDatasetInfoJson());
    expect(info.splits).toHaveLength(2);
    expect(info.splits[0]).toEqual({ name: 'train', num_examples: 8000 });
    expect(info.features).toHaveLength(2);
  });

  it('returns empty fields, has_dataset_info=false, on a model card with no dataset keys', () => {
    const input = new ModelCard();
    input.setText(MODEL_CARD);
    const result = extractDatasetCardFields(ctx, input);
    expect(result.getTaskCategoriesList()).toHaveLength(0);
    expect(result.getHasDatasetInfo()).toBe(false);
    expect(result.getDatasetInfoJson()).toBe('');
  });

  it('returns empty fields when there is no frontmatter', () => {
    const input = new ModelCard();
    input.setText(NO_FRONTMATTER_CARD);
    const result = extractDatasetCardFields(ctx, input);
    expect(result.getTaskCategoriesList()).toHaveLength(0);
    expect(result.getHasDatasetInfo()).toBe(false);
  });
});

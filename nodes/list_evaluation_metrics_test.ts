import { ModelCard } from '../gen/messages_pb';
import { listEvaluationMetrics } from './list_evaluation_metrics';
import { extractModelIndex } from './extract_model_index';
import { ctx, MODEL_CARD, MODEL_CARD_ORACLE, NO_FRONTMATTER_CARD } from './testkit';

describe('ListEvaluationMetrics', () => {
  it('flattens model-index into one row per metric, matching the hand-derived oracle', () => {
    const input = new ModelCard();
    input.setText(MODEL_CARD);
    const result = listEvaluationMetrics(ctx, input);
    expect(result.getPresent()).toBe(true);
    const rows = result.getMetricsList();
    expect(rows).toHaveLength(2);
    for (let i = 0; i < rows.length; i++) {
      const oracle = MODEL_CARD_ORACLE.modelIndex.metrics[i];
      expect(rows[i].getModelIndexName()).toBe(MODEL_CARD_ORACLE.modelIndex.name);
      expect(rows[i].getTaskName()).toBe(MODEL_CARD_ORACLE.modelIndex.taskName);
      expect(rows[i].getDatasetName()).toBe(MODEL_CARD_ORACLE.modelIndex.datasetName);
      expect(rows[i].getMetricName()).toBe(oracle.name);
      expect(rows[i].getValue()).toBe(oracle.value);
      expect(rows[i].getValueIsNumeric()).toBe(oracle.numeric);
    }
  });

  it('present=false, empty list, when model-index is absent', () => {
    const input = new ModelCard();
    input.setText(NO_FRONTMATTER_CARD);
    const result = listEvaluationMetrics(ctx, input);
    expect(result.getPresent()).toBe(false);
    expect(result.getMetricsList()).toHaveLength(0);
  });

  it('is a strict flattening of ExtractModelIndex — total row count equals the sum of nested metric counts (independent cross-check within the package)', () => {
    const input = new ModelCard();
    input.setText(MODEL_CARD);
    const flat = listEvaluationMetrics(ctx, input);
    const nested = extractModelIndex(ctx, input);
    let nestedMetricCount = 0;
    for (const entry of nested.getEntriesList()) {
      for (const r of entry.getResultsList()) nestedMetricCount += r.getMetricsList().length;
    }
    expect(flat.getMetricsList().length).toBe(nestedMetricCount);
  });
});

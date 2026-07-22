import { ModelCard } from '../gen/messages_pb';
import { extractModelIndex } from './extract_model_index';
import { ctx, MODEL_CARD, MODEL_CARD_ORACLE, NO_FRONTMATTER_CARD } from './testkit';

describe('ExtractModelIndex', () => {
  it('parses the nested model-index structure exactly against the hand-derived oracle', () => {
    const input = new ModelCard();
    input.setText(MODEL_CARD);
    const result = extractModelIndex(ctx, input);
    expect(result.getPresent()).toBe(true);
    const entries = result.getEntriesList();
    expect(entries).toHaveLength(1);
    expect(entries[0].getName()).toBe(MODEL_CARD_ORACLE.modelIndex.name);

    const results = entries[0].getResultsList();
    expect(results).toHaveLength(1);
    const r = results[0];
    expect(r.getTaskType()).toBe(MODEL_CARD_ORACLE.modelIndex.taskType);
    expect(r.getTaskName()).toBe(MODEL_CARD_ORACLE.modelIndex.taskName);
    expect(r.getDatasetType()).toBe(MODEL_CARD_ORACLE.modelIndex.datasetType);
    expect(r.getDatasetName()).toBe(MODEL_CARD_ORACLE.modelIndex.datasetName);
    expect(r.getDatasetSplit()).toBe(MODEL_CARD_ORACLE.modelIndex.datasetSplit);

    const metrics = r.getMetricsList();
    expect(metrics).toHaveLength(2);
    for (let i = 0; i < metrics.length; i++) {
      const oracle = MODEL_CARD_ORACLE.modelIndex.metrics[i];
      expect(metrics[i].getName()).toBe(oracle.name);
      expect(metrics[i].getType()).toBe(oracle.type);
      expect(metrics[i].getValue()).toBe(oracle.value);
      expect(metrics[i].getValueIsNumeric()).toBe(oracle.numeric);
      expect(metrics[i].getValueNumber()).toBeCloseTo(oracle.num);
    }
  });

  it('present=false, empty entries, not an error, when model-index is absent', () => {
    const input = new ModelCard();
    input.setText(NO_FRONTMATTER_CARD);
    const result = extractModelIndex(ctx, input);
    expect(result.getPresent()).toBe(false);
    expect(result.getEntriesList()).toHaveLength(0);
    expect(result.getError()).toBe('');
  });

  it('tolerates a malformed model-index entry (missing results) without crashing', () => {
    const input = new ModelCard();
    input.setText('---\nmodel-index:\n  - name: broken\n---\nbody\n');
    const result = extractModelIndex(ctx, input);
    expect(result.getPresent()).toBe(true);
    expect(result.getEntriesList()).toHaveLength(1);
    expect(result.getEntriesList()[0].getResultsList()).toHaveLength(0);
  });

  it('is deterministic across repeated invocations', () => {
    const input = new ModelCard();
    input.setText(MODEL_CARD);
    const r1 = extractModelIndex(ctx, input);
    const r2 = extractModelIndex(ctx, input);
    expect(r1.getEntriesList()[0].getResultsList()[0].getMetricsList()[0].getValue()).toBe(
      r2.getEntriesList()[0].getResultsList()[0].getMetricsList()[0].getValue(),
    );
  });
});

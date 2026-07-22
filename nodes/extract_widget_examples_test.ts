import { ModelCard } from '../gen/messages_pb';
import { extractWidgetExamples } from './extract_widget_examples';
import { ctx, MODEL_CARD, MODEL_CARD_ORACLE, NO_FRONTMATTER_CARD } from './testkit';

describe('ExtractWidgetExamples', () => {
  it('extracts widget examples, matching the hand-derived oracle', () => {
    const input = new ModelCard();
    input.setText(MODEL_CARD);
    const result = extractWidgetExamples(ctx, input);
    expect(result.getPresent()).toBe(true);
    const examples = result.getExamplesList();
    expect(examples).toHaveLength(1);
    expect(examples[0].getText()).toBe(MODEL_CARD_ORACLE.widget[0].text);
    expect(examples[0].getExampleTitle()).toBe(MODEL_CARD_ORACLE.widget[0].exampleTitle);
    const raw = JSON.parse(examples[0].getRawJson());
    expect(raw.text).toBe(MODEL_CARD_ORACLE.widget[0].text);
  });

  it('present=false, empty list, when widget is absent', () => {
    const input = new ModelCard();
    input.setText(NO_FRONTMATTER_CARD);
    const result = extractWidgetExamples(ctx, input);
    expect(result.getPresent()).toBe(false);
    expect(result.getExamplesList()).toHaveLength(0);
  });

  it('preserves structured (non-plain-text) widget entries via raw_json', () => {
    const input = new ModelCard();
    input.setText('---\nwidget:\n  - structured_data:\n      col1: [1, 2, 3]\n---\nbody\n');
    const result = extractWidgetExamples(ctx, input);
    expect(result.getPresent()).toBe(true);
    const raw = JSON.parse(result.getExamplesList()[0].getRawJson());
    expect(raw.structured_data.col1).toEqual([1, 2, 3]);
  });
});

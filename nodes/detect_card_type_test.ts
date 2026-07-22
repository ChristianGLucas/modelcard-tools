import { ModelCard } from '../gen/messages_pb';
import { detectCardType } from './detect_card_type';
import { ctx, MODEL_CARD, MODEL_CARD_ORACLE, DATASET_CARD, DATASET_CARD_ORACLE, NO_FRONTMATTER_CARD } from './testkit';

describe('DetectCardType', () => {
  it('classifies a model card as "model" with the exact driving signals', () => {
    const input = new ModelCard();
    input.setText(MODEL_CARD);
    const result = detectCardType(ctx, input);
    expect(result.getCardType()).toBe('model');
    expect(result.getSignalsList()).toEqual(MODEL_CARD_ORACLE.cardTypeSignals);
  });

  it('classifies a dataset card as "dataset" with the exact driving signals', () => {
    const input = new ModelCard();
    input.setText(DATASET_CARD);
    const result = detectCardType(ctx, input);
    expect(result.getCardType()).toBe('dataset');
    expect(result.getSignalsList()).toEqual(DATASET_CARD_ORACLE.cardTypeSignals);
  });

  it('returns "unknown" with no signals when there is no frontmatter', () => {
    const input = new ModelCard();
    input.setText(NO_FRONTMATTER_CARD);
    const result = detectCardType(ctx, input);
    expect(result.getCardType()).toBe('unknown');
    expect(result.getSignalsList()).toHaveLength(0);
  });

  it('returns "unknown" when frontmatter has neither model nor dataset signal keys', () => {
    const input = new ModelCard();
    input.setText('---\nauthor: someone\n---\nbody\n');
    const result = detectCardType(ctx, input);
    expect(result.getCardType()).toBe('unknown');
  });
});

import { ModelCard } from '../gen/messages_pb';
import { summarizeCard } from './summarize_card';
import { ctx, MODEL_CARD, MODEL_CARD_ORACLE, DATASET_CARD, NO_FRONTMATTER_CARD, MALFORMED_FRONTMATTER_CARD } from './testkit';

describe('SummarizeCard', () => {
  it('summarizes a model card, matching the hand-derived oracle', () => {
    const input = new ModelCard();
    input.setText(MODEL_CARD);
    const result = summarizeCard(ctx, input);
    expect(result.getHasFrontmatter()).toBe(true);
    expect(result.getFrontmatterValid()).toBe(true);
    expect(result.getCardType()).toBe('model');
    expect(result.getFrontmatterKeyCount()).toBe(MODEL_CARD_ORACLE.frontmatterKeyCount);
    expect(result.getTagCount()).toBe(MODEL_CARD_ORACLE.tags.length);
    expect(result.getLanguageCount()).toBe(MODEL_CARD_ORACLE.languages.length);
    expect(result.getSectionCount()).toBe(MODEL_CARD_ORACLE.sectionCount);
    expect(result.getHasLicense()).toBe(true);
    expect(result.getHasEvalResults()).toBe(true);
    expect(result.getHasWidgetExamples()).toBe(true);
    expect(result.getHasCarbonFootprint()).toBe(true);
    expect(result.getBodyWordCount()).toBeGreaterThan(0);
  });

  it('summarizes a dataset card as card_type "dataset" with no eval results', () => {
    const input = new ModelCard();
    input.setText(DATASET_CARD);
    const result = summarizeCard(ctx, input);
    expect(result.getCardType()).toBe('dataset');
    expect(result.getHasEvalResults()).toBe(false);
    expect(result.getHasWidgetExamples()).toBe(false);
    expect(result.getHasCarbonFootprint()).toBe(false);
  });

  it('summarizes a card with no frontmatter as card_type "unknown"', () => {
    const input = new ModelCard();
    input.setText(NO_FRONTMATTER_CARD);
    const result = summarizeCard(ctx, input);
    expect(result.getHasFrontmatter()).toBe(false);
    expect(result.getCardType()).toBe('unknown');
    expect(result.getFrontmatterKeyCount()).toBe(0);
    expect(result.getSectionCount()).toBe(1); // "# Just a README" heading itself is one section
  });

  it('reports frontmatter_valid=false on malformed YAML without crashing', () => {
    const input = new ModelCard();
    input.setText(MALFORMED_FRONTMATTER_CARD);
    const result = summarizeCard(ctx, input);
    expect(result.getHasFrontmatter()).toBe(true);
    expect(result.getFrontmatterValid()).toBe(false);
    expect(result.getCardType()).toBe('unknown');
  });
});

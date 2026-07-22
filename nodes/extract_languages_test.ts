import { ModelCard } from '../gen/messages_pb';
import { extractLanguages } from './extract_languages';
import { ctx, MODEL_CARD, MODEL_CARD_ORACLE, NO_FRONTMATTER_CARD } from './testkit';

describe('ExtractLanguages', () => {
  it('extracts a YAML-sequence language list', () => {
    const input = new ModelCard();
    input.setText(MODEL_CARD);
    const result = extractLanguages(ctx, input);
    expect(result.getLanguagesList()).toEqual(MODEL_CARD_ORACLE.languages);
  });

  it('normalizes a single scalar language to a one-element list', () => {
    const input = new ModelCard();
    input.setText('---\nlanguage: en\n---\nbody\n');
    const result = extractLanguages(ctx, input);
    expect(result.getLanguagesList()).toEqual(['en']);
  });

  it('returns an empty list when language is absent or there is no frontmatter', () => {
    const input = new ModelCard();
    input.setText(NO_FRONTMATTER_CARD);
    const result = extractLanguages(ctx, input);
    expect(result.getLanguagesList()).toHaveLength(0);
  });
});

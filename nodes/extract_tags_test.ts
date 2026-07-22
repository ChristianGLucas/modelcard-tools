import { ModelCard } from '../gen/messages_pb';
import { extractTags } from './extract_tags';
import { ctx, MODEL_CARD, MODEL_CARD_ORACLE, NO_FRONTMATTER_CARD } from './testkit';

describe('ExtractTags', () => {
  it('extracts the full tags list, order preserved', () => {
    const input = new ModelCard();
    input.setText(MODEL_CARD);
    const result = extractTags(ctx, input);
    expect(result.getTagsList()).toEqual(MODEL_CARD_ORACLE.tags);
  });

  it('returns an empty list, not an error, when tags is absent', () => {
    const input = new ModelCard();
    input.setText('---\nlicense: mit\n---\nbody\n');
    const result = extractTags(ctx, input);
    expect(result.getTagsList()).toHaveLength(0);
    expect(result.getError()).toBe('');
  });

  it('returns an empty list when there is no frontmatter at all', () => {
    const input = new ModelCard();
    input.setText(NO_FRONTMATTER_CARD);
    const result = extractTags(ctx, input);
    expect(result.getTagsList()).toHaveLength(0);
  });

  it('normalizes a single scalar tag to a one-element list', () => {
    const input = new ModelCard();
    input.setText('---\ntags: solo-tag\n---\nbody\n');
    const result = extractTags(ctx, input);
    expect(result.getTagsList()).toEqual(['solo-tag']);
  });
});

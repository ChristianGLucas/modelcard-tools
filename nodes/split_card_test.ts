import { ModelCard } from '../gen/messages_pb';
import { splitCard } from './split_card';
import { ctx, MODEL_CARD, MODEL_CARD_BODY, NO_FRONTMATTER_CARD, MALFORMED_FRONTMATTER_CARD, BOM_CARD, MAX_TEXT_BYTES, MAX_FRONTMATTER_BYTES } from './testkit';

describe('SplitCard', () => {
  it('splits frontmatter from body on a well-formed card', () => {
    const input = new ModelCard();
    input.setText(MODEL_CARD);
    const result = splitCard(ctx, input);
    expect(result.getHasFrontmatter()).toBe(true);
    expect(result.getFrontmatterParseError()).toBe(false);
    expect(result.getBody()).toBe(MODEL_CARD_BODY);
    expect(result.getFrontmatterRaw()).toContain('license: apache-2.0');
    expect(result.getError()).toBe('');
  });

  it('reports has_frontmatter=false and the whole text as body when there is no fence', () => {
    const input = new ModelCard();
    input.setText(NO_FRONTMATTER_CARD);
    const result = splitCard(ctx, input);
    expect(result.getHasFrontmatter()).toBe(false);
    expect(result.getBody()).toBe(NO_FRONTMATTER_CARD);
    expect(result.getFrontmatterParseError()).toBe(false);
  });

  it('reports frontmatter_parse_error (not a crash, not top-level error) on malformed YAML', () => {
    const input = new ModelCard();
    input.setText(MALFORMED_FRONTMATTER_CARD);
    const result = splitCard(ctx, input);
    expect(result.getHasFrontmatter()).toBe(true);
    expect(result.getFrontmatterParseError()).toBe(true);
    expect(result.getParseErrorMessage().length).toBeGreaterThan(0);
    expect(result.getError()).toBe('');
  });

  it('sets the top-level error, not a crash, on oversized whole input', () => {
    const input = new ModelCard();
    input.setText('a'.repeat(MAX_TEXT_BYTES + 10));
    const result = splitCard(ctx, input);
    expect(result.getError()).toContain(String(MAX_TEXT_BYTES));
  });

  it('treats an oversized frontmatter block as absent rather than parsing it', () => {
    const hugeFrontmatter = '---\n' + 'x: ' + 'a'.repeat(MAX_FRONTMATTER_BYTES + 10) + '\n---\nbody\n';
    const input = new ModelCard();
    input.setText(hugeFrontmatter);
    const result = splitCard(ctx, input);
    expect(result.getHasFrontmatter()).toBe(false);
    expect(result.getError()).toBe('');
  });

  it('REGRESSION: a leading UTF-8 BOM does not hide a well-formed frontmatter block', () => {
    const input = new ModelCard();
    input.setText(BOM_CARD);
    const result = splitCard(ctx, input);
    expect(result.getHasFrontmatter()).toBe(true);
    expect(result.getFrontmatterParseError()).toBe(false);
    expect(result.getFrontmatterRaw()).toContain('license: mit');
    expect(result.getBody().trim()).toBe('# Body');
  });

  it('is deterministic across repeated invocations', () => {
    const input = new ModelCard();
    input.setText(MODEL_CARD);
    const r1 = splitCard(ctx, input);
    const r2 = splitCard(ctx, input);
    expect(r1.getBody()).toBe(r2.getBody());
    expect(r1.getFrontmatterRaw()).toBe(r2.getFrontmatterRaw());
  });
});

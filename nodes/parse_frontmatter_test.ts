import { ModelCard } from '../gen/messages_pb';
import { parseFrontmatter } from './parse_frontmatter';
import { ctx, MODEL_CARD, MODEL_CARD_ORACLE, NO_FRONTMATTER_CARD, MALFORMED_FRONTMATTER_CARD } from './testkit';

function entryMap(entries: { getKey(): string; getValueJson(): string }[]): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const e of entries) out[e.getKey()] = JSON.parse(e.getValueJson());
  return out;
}

describe('ParseFrontmatter', () => {
  it('normalizes every top-level key with a JSON-round-trippable value', () => {
    const input = new ModelCard();
    input.setText(MODEL_CARD);
    const result = parseFrontmatter(ctx, input);
    expect(result.getHasFrontmatter()).toBe(true);
    expect(result.getValid()).toBe(true);
    const data = entryMap(result.getEntriesList());
    expect(data.license).toBe(MODEL_CARD_ORACLE.license);
    expect(data.tags).toEqual(MODEL_CARD_ORACLE.tags);
    expect(data.language).toEqual(MODEL_CARD_ORACLE.languages);
    expect(data.pipeline_tag).toBe(MODEL_CARD_ORACLE.pipelineTag);
    expect(Object.keys(data)).toHaveLength(MODEL_CARD_ORACLE.frontmatterKeyCount);
  });

  it('returns has_frontmatter=false, no entries, for a card with no fence', () => {
    const input = new ModelCard();
    input.setText(NO_FRONTMATTER_CARD);
    const result = parseFrontmatter(ctx, input);
    expect(result.getHasFrontmatter()).toBe(false);
    expect(result.getEntriesList()).toHaveLength(0);
  });

  it('reports valid=false and a parse_error on malformed YAML, never throws', () => {
    const input = new ModelCard();
    input.setText(MALFORMED_FRONTMATTER_CARD);
    const result = parseFrontmatter(ctx, input);
    expect(result.getHasFrontmatter()).toBe(true);
    expect(result.getValid()).toBe(false);
    expect(result.getParseError().length).toBeGreaterThan(0);
    expect(result.getEntriesList()).toHaveLength(0);
  });
});

import { ModelCard } from '../gen/messages_pb';
import { extractPipelineTag } from './extract_pipeline_tag';
import { ctx, MODEL_CARD, MODEL_CARD_ORACLE, NO_FRONTMATTER_CARD } from './testkit';

describe('ExtractPipelineTag', () => {
  it('extracts pipeline_tag when present', () => {
    const input = new ModelCard();
    input.setText(MODEL_CARD);
    const result = extractPipelineTag(ctx, input);
    expect(result.getPresent()).toBe(true);
    expect(result.getPipelineTag()).toBe(MODEL_CARD_ORACLE.pipelineTag);
  });

  it('present=false, not an error, when absent', () => {
    const input = new ModelCard();
    input.setText(NO_FRONTMATTER_CARD);
    const result = extractPipelineTag(ctx, input);
    expect(result.getPresent()).toBe(false);
    expect(result.getPipelineTag()).toBe('');
    expect(result.getError()).toBe('');
  });
});

import { ModelCard } from '../gen/messages_pb';
import { extractLibraryName } from './extract_library_name';
import { ctx, MODEL_CARD, MODEL_CARD_ORACLE, NO_FRONTMATTER_CARD } from './testkit';

describe('ExtractLibraryName', () => {
  it('extracts library_name when present', () => {
    const input = new ModelCard();
    input.setText(MODEL_CARD);
    const result = extractLibraryName(ctx, input);
    expect(result.getPresent()).toBe(true);
    expect(result.getLibraryName()).toBe(MODEL_CARD_ORACLE.libraryName);
  });

  it('present=false, not an error, when absent', () => {
    const input = new ModelCard();
    input.setText(NO_FRONTMATTER_CARD);
    const result = extractLibraryName(ctx, input);
    expect(result.getPresent()).toBe(false);
    expect(result.getError()).toBe('');
  });
});

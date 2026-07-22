import { GetSectionRequest } from '../gen/messages_pb';
import { getSection } from './get_section';
import { ctx, MODEL_CARD } from './testkit';

describe('GetSection', () => {
  it('finds an exact-match section by heading', () => {
    const input = new GetSectionRequest();
    input.setText(MODEL_CARD);
    input.setHeading('Training Data');
    const result = getSection(ctx, input);
    expect(result.getFound()).toBe(true);
    expect(result.getSection()!.getContent()).toBe('Trained on C4 and The Pile.');
  });

  it('matches case-insensitively and via substring on a partial heading', () => {
    const input = new GetSectionRequest();
    input.setText(MODEL_CARD);
    input.setHeading('intended uses');
    const result = getSection(ctx, input);
    expect(result.getFound()).toBe(true);
    expect(result.getSection()!.getHeading()).toBe('Intended Uses & Limitations');
  });

  it('found=false, not an error, when no heading matches', () => {
    const input = new GetSectionRequest();
    input.setText(MODEL_CARD);
    input.setHeading('Nonexistent Section Nobody Wrote');
    const result = getSection(ctx, input);
    expect(result.getFound()).toBe(false);
    expect(result.getError()).toBe('');
  });

  it('found=false on an empty heading request', () => {
    const input = new GetSectionRequest();
    input.setText(MODEL_CARD);
    input.setHeading('');
    const result = getSection(ctx, input);
    expect(result.getFound()).toBe(false);
  });
});

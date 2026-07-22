import { ModelCard } from '../gen/messages_pb';
import { extractLicense } from './extract_license';
import { ctx, MODEL_CARD, DATASET_CARD, NO_FRONTMATTER_CARD } from './testkit';

describe('ExtractLicense', () => {
  it('extracts license from a model card', () => {
    const input = new ModelCard();
    input.setText(MODEL_CARD);
    const result = extractLicense(ctx, input);
    expect(result.getPresent()).toBe(true);
    expect(result.getLicense()).toBe('apache-2.0');
    expect(result.getLicenseName()).toBe('');
  });

  it('extracts a different license from the dataset card fixture', () => {
    const input = new ModelCard();
    input.setText(DATASET_CARD);
    const result = extractLicense(ctx, input);
    expect(result.getPresent()).toBe(true);
    expect(result.getLicense()).toBe('cc-by-4.0');
  });

  it('extracts license_name for an "other" license', () => {
    const input = new ModelCard();
    input.setText('---\nlicense: other\nlicense_name: my-custom-license\nlicense_link: https://example.com/license\n---\nbody\n');
    const result = extractLicense(ctx, input);
    expect(result.getPresent()).toBe(true);
    expect(result.getLicense()).toBe('other');
    expect(result.getLicenseName()).toBe('my-custom-license');
    expect(result.getLicenseLink()).toBe('https://example.com/license');
  });

  it('present=false, not an error, when there is no frontmatter', () => {
    const input = new ModelCard();
    input.setText(NO_FRONTMATTER_CARD);
    const result = extractLicense(ctx, input);
    expect(result.getPresent()).toBe(false);
    expect(result.getError()).toBe('');
  });
});

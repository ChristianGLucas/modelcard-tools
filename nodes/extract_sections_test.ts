import { ModelCard } from '../gen/messages_pb';
import { extractSections } from './extract_sections';
import { ctx, MODEL_CARD, MODEL_CARD_ORACLE } from './testkit';

describe('ExtractSections', () => {
  it('splits the body into sections matching the hand-derived oracle exactly', () => {
    const input = new ModelCard();
    input.setText(MODEL_CARD);
    const result = extractSections(ctx, input);
    expect(result.getPreamble()).toBe('');
    const sections = result.getSectionsList();
    expect(sections).toHaveLength(MODEL_CARD_ORACLE.sectionCount);
    for (let i = 0; i < sections.length; i++) {
      const oracle = MODEL_CARD_ORACLE.sections[i];
      expect(sections[i].getLevel()).toBe(oracle.level);
      expect(sections[i].getHeading()).toBe(oracle.heading);
      expect(sections[i].getContent()).toBe(oracle.content);
    }
  });

  it('puts everything in preamble when there are no headings at all', () => {
    const input = new ModelCard();
    input.setText('Just some prose.\n\nNo headings anywhere in this text.\n');
    const result = extractSections(ctx, input);
    expect(result.getSectionsList()).toHaveLength(0);
    expect(result.getPreamble()).toContain('No headings anywhere in this text.');
  });

  it('does not split on a "#" inside a fenced code block', () => {
    const input = new ModelCard();
    input.setText('# Title\n\n```bash\n# this is a shell comment, not a heading\necho hi\n```\n\n## Real Section\n\ncontent\n');
    const result = extractSections(ctx, input);
    const sections = result.getSectionsList();
    expect(sections).toHaveLength(2);
    expect(sections[0].getHeading()).toBe('Title');
    expect(sections[0].getContent()).toContain('# this is a shell comment');
    expect(sections[1].getHeading()).toBe('Real Section');
  });
});

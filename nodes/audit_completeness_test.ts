import { ModelCard } from '../gen/messages_pb';
import { auditCompleteness } from './audit_completeness';
import { ctx, MODEL_CARD, MODEL_CARD_ORACLE, NO_FRONTMATTER_CARD } from './testkit';

describe('AuditCompleteness', () => {
  it('flags exactly the standard sections present, matching the hand-derived oracle', () => {
    const input = new ModelCard();
    input.setText(MODEL_CARD);
    const result = auditCompleteness(ctx, input);
    expect(result.getTotalCount()).toBe(MODEL_CARD_ORACLE.completenessTotal);
    expect(result.getPresentCount()).toBe(MODEL_CARD_ORACLE.completenessPresent.length);
    expect(result.getCompletenessRatio()).toBeCloseTo(
      MODEL_CARD_ORACLE.completenessPresent.length / MODEL_CARD_ORACLE.completenessTotal,
    );
    const presentNames = result
      .getSectionsList()
      .filter((s) => s.getPresent())
      .map((s) => s.getStandardSection());
    expect(presentNames).toEqual(MODEL_CARD_ORACLE.completenessPresent);

    // Bias/Risks/Limitations must NOT false-positive-match on "Intended Uses
    // & Limitations" — the word "Limitations" alone must not trigger it.
    const bias = result.getSectionsList().find((s) => s.getStandardSection() === 'Bias, Risks, and Limitations');
    expect(bias!.getPresent()).toBe(false);
  });

  it('every standard section is absent, ratio 0, for a card with no headings', () => {
    const input = new ModelCard();
    input.setText(NO_FRONTMATTER_CARD);
    const result = auditCompleteness(ctx, input);
    expect(result.getPresentCount()).toBe(0);
    expect(result.getCompletenessRatio()).toBe(0);
    expect(result.getSectionsList().every((s) => !s.getPresent())).toBe(true);
  });
});

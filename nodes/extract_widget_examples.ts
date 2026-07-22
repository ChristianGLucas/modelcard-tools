import { ModelCard, ExtractWidgetExamplesResult, WidgetExample } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { isOversized, MAX_TEXT_BYTES, parseCard, safeJsonStringify, toStringOrEmpty } from './lib';

/**
 * Extract a model card's `widget` inference examples. Each entry's plain
 * `text` and `example_title` fields (when present) are surfaced directly;
 * raw_json preserves the full entry for fidelity beyond those two fields
 * (widget entries can carry structured multi-field inputs, `src`, expected
 * `output`, etc.). present is false when the key is absent or not a list.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function extractWidgetExamples(ax: AxiomContext, input: ModelCard): ExtractWidgetExamplesResult {
  const out = new ExtractWidgetExamplesResult();
  const text = input.getText();
  if (isOversized(text)) {
    out.setError(`input exceeds ${MAX_TEXT_BYTES} bytes`);
    return out;
  }
  const parsed = parseCard(text);
  if (!parsed.hasFrontmatter || !parsed.valid) return out;
  const raw = parsed.data.widget;
  if (!Array.isArray(raw)) {
    out.setPresent(false);
    return out;
  }
  out.setPresent(true);
  out.setExamplesList(
    raw.map((entry) => {
      const w = new WidgetExample();
      if (entry && typeof entry === 'object') {
        const e = entry as Record<string, unknown>;
        w.setText(toStringOrEmpty(e.text));
        w.setExampleTitle(toStringOrEmpty(e.example_title));
      }
      w.setRawJson(safeJsonStringify(entry));
      return w;
    }),
  );
  return out;
}

import { ModelCard, ListEvaluationMetricsResult, EvaluationMetricRow } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { flattenModelIndex, normalizeModelIndex, parseCard } from './lib';

/**
 * List every evaluation metric reported in a model card's `model-index` as
 * a flat table — one row per (model-index name, task, dataset, metric),
 * with metric name/type/value plus a numeric-parsed value when the value is
 * numeric. This is the same data as ExtractModelIndex, flattened for
 * consumers that want a table rather than the nested structure. present is
 * false when the card has no `model-index` key.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function listEvaluationMetrics(ax: AxiomContext, input: ModelCard): ListEvaluationMetricsResult {
  const out = new ListEvaluationMetricsResult();
  const text = input.getText();
  const parsed = parseCard(text);
  if (!parsed.hasFrontmatter || !parsed.valid) return out;
  const raw = (parsed.data as Record<string, unknown>)['model-index'];
  if (raw === undefined) {
    out.setPresent(false);
    return out;
  }
  const rows = flattenModelIndex(normalizeModelIndex(raw));
  out.setPresent(true);
  out.setMetricsList(
    rows.map((r) => {
      const row = new EvaluationMetricRow();
      row.setModelIndexName(r.modelIndexName);
      row.setTaskName(r.taskName);
      row.setDatasetName(r.datasetName);
      row.setMetricName(r.metricName);
      row.setMetricType(r.metricType);
      row.setValue(r.value);
      row.setValueIsNumeric(r.valueIsNumeric);
      row.setValueNumber(r.valueNumber);
      return row;
    }),
  );
  return out;
}

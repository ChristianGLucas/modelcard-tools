import { ModelCard, ModelIndexResult, ModelIndexEntry, EvalDatasetResult, EvalMetric } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { normalizeModelIndex, parseCard } from './lib';

/**
 * Extract a model card's `model-index` structured evaluation results — the
 * high-value node for eval auditing: each entry (name -> results[] ->
 * dataset + task + metrics[name,type,value]), preserved as the nested
 * structure the frontmatter declares it in. present is false when the card
 * has no `model-index` key (not an error — most cards omit it). Use
 * ListEvaluationMetrics instead when you want a flat metric table rather
 * than this nested shape.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function extractModelIndex(ax: AxiomContext, input: ModelCard): ModelIndexResult {
  const out = new ModelIndexResult();
  const text = input.getText();
  const parsed = parseCard(text);
  if (!parsed.hasFrontmatter || !parsed.valid) return out;
  const raw = (parsed.data as Record<string, unknown>)['model-index'];
  if (raw === undefined) {
    out.setPresent(false);
    return out;
  }
  const entries = normalizeModelIndex(raw);
  out.setPresent(true);
  out.setEntriesList(
    entries.map((e) => {
      const entry = new ModelIndexEntry();
      entry.setName(e.name);
      entry.setResultsList(
        e.results.map((r) => {
          const res = new EvalDatasetResult();
          res.setTaskType(r.taskType);
          res.setTaskName(r.taskName);
          res.setDatasetType(r.datasetType);
          res.setDatasetName(r.datasetName);
          res.setDatasetConfig(r.datasetConfig);
          res.setDatasetSplit(r.datasetSplit);
          res.setDatasetRevision(r.datasetRevision);
          res.setMetricsList(
            r.metrics.map((m) => {
              const metric = new EvalMetric();
              metric.setName(m.name);
              metric.setType(m.type);
              metric.setValue(m.value);
              metric.setValueIsNumeric(m.valueIsNumeric);
              metric.setValueNumber(m.valueNumber);
              return metric;
            }),
          );
          return res;
        }),
      );
      return entry;
    }),
  );
  return out;
}

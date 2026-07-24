import { ModelCard, ExtractDatasetCardFieldsResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { parseCard, safeJsonStringify, toStringArray } from './lib';

/**
 * Extract the dataset-card-specific frontmatter fields: `task_categories`,
 * `size_categories`, `language`, and `dataset_info` (splits/features).
 * dataset_info's real-world shape varies (a single config's object, or a
 * list of per-config objects) too much to force into a fixed message, so it
 * is returned as JSON via dataset_info_json; has_dataset_info tells you
 * whether the key was present at all.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function extractDatasetCardFields(ax: AxiomContext, input: ModelCard): ExtractDatasetCardFieldsResult {
  const out = new ExtractDatasetCardFieldsResult();
  const text = input.getText();
  const parsed = parseCard(text);
  if (!parsed.hasFrontmatter || !parsed.valid) return out;
  out.setTaskCategoriesList(toStringArray(parsed.data.task_categories));
  out.setSizeCategoriesList(toStringArray(parsed.data.size_categories));
  out.setLanguagesList(toStringArray(parsed.data.language));
  const hasDatasetInfo = parsed.data.dataset_info !== undefined;
  out.setHasDatasetInfo(hasDatasetInfo);
  if (hasDatasetInfo) out.setDatasetInfoJson(safeJsonStringify(parsed.data.dataset_info));
  return out;
}

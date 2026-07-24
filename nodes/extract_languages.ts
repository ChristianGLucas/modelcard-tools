import { ModelCard, ExtractLanguagesResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { parseCard, toStringArray } from './lib';

/**
 * Extract a card's `language` field, normalized to a flat list regardless
 * of whether the frontmatter wrote it as a single scalar (`language: en`)
 * or a YAML sequence (`language: [en, fr]`).
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function extractLanguages(ax: AxiomContext, input: ModelCard): ExtractLanguagesResult {
  const out = new ExtractLanguagesResult();
  const text = input.getText();
  const parsed = parseCard(text);
  if (!parsed.hasFrontmatter || !parsed.valid) return out;
  out.setLanguagesList(toStringArray(parsed.data.language));
  return out;
}

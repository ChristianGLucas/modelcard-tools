import { ModelCard, ExtractLicenseResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { isOversized, isPresent, MAX_TEXT_BYTES, parseCard, toStringOrEmpty } from './lib';

/**
 * Extract a card's license metadata: the `license` identifier (e.g. "mit",
 * "apache-2.0", "other"), `license_name` (a free-text name, used when
 * license is "other"), and `license_link`, when present. present is true
 * only when the `license` key itself is set.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function extractLicense(ax: AxiomContext, input: ModelCard): ExtractLicenseResult {
  const out = new ExtractLicenseResult();
  const text = input.getText();
  if (isOversized(text)) {
    out.setError(`input exceeds ${MAX_TEXT_BYTES} bytes`);
    return out;
  }
  const parsed = parseCard(text);
  if (!parsed.hasFrontmatter || !parsed.valid) return out;
  const present = isPresent(parsed.data.license);
  out.setPresent(present);
  if (present) out.setLicense(toStringOrEmpty(parsed.data.license));
  out.setLicenseName(toStringOrEmpty(parsed.data.license_name));
  out.setLicenseLink(toStringOrEmpty(parsed.data.license_link));
  return out;
}

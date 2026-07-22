// Regression coverage for shared lib.ts security/safety helpers that aren't
// tied to one specific node's public behavior. Not a node's test file (no
// node named "Lib"), just collected by jest's *_test.ts glob like testkit.ts
// is exempted from being one.
import matter from 'gray-matter';
import { SAFE_MATTER_OPTIONS, parseCard } from './lib';

describe('SAFE_MATTER_OPTIONS (gray-matter engine hardening)', () => {
  it('REGRESSION: actually disables the eval()-based `javascript` fence engine, not merely shadows it', () => {
    // gray-matter merges caller-supplied `engines` OVER its defaults
    // (Object.assign({}, defaults, opts.engines)) — a naive
    // `{ engines: { yaml: matter.engines.yaml } }` does NOT remove the
    // `javascript` engine, so a first attempt at this fix was a no-op.
    // This proves SAFE_MATTER_OPTIONS actually blocks it.
    const maliciousCard = '---js\nmodule.exports = { pwned: (globalThis.__pwned__ = true, 1) }\n---\nbody\n';
    expect(() => matter(maliciousCard, SAFE_MATTER_OPTIONS)).toThrow(/not registered/);
    expect((globalThis as Record<string, unknown>).__pwned__).toBeUndefined();
  });

  it('does not affect ordinary YAML frontmatter parsing', () => {
    const result = parseCard('---\nlicense: mit\n---\nbody\n');
    expect(result.hasFrontmatter).toBe(true);
    expect(result.valid).toBe(true);
    expect(result.data.license).toBe('mit');
  });
});

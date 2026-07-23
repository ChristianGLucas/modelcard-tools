# modelcard-tools

Deterministic, **Hugging Face-card-semantic** parsing and inspection of ML
model cards and dataset cards — built for the [Axiom](https://axiomide.com)
marketplace, handle `christiangeorgelucas`.

A model/dataset card is the Hugging Face-style `README.md`: `---`-fenced YAML
frontmatter followed by a Markdown body. This package understands the HF card
schema — `license`, `pipeline_tag`, `base_model`, `library_name`,
`model-index` evaluation results, `dataset_info`, etc. — and pulls out
exactly what an ML/agent workflow needs (model discovery, license/eval
auditing, dataset provenance), distinct from generic frontmatter/markdown
tools (`markdown-tools`, `readability-tools`, `dataformat-tools`).

The card is always supplied as text by the caller — there is no Hugging Face
Hub API call, no network, no wall-clock, and no randomness. Every node is a
pure, deterministic function of its input.

## Use it from your agent or app

Every node in this package is a **live, auto-scaling API endpoint** on the
[Axiom](https://axiomide.com) marketplace — call it from an AI agent or your own
code, with nothing to self-host.

**📦 See it on the marketplace:**
https://dev.axiomide.com/marketplace/christiangeorgelucas/modelcard-tools@0.1.0

**Hook it up to an AI agent (MCP).** Add Axiom's hosted MCP server to any MCP
client and every node becomes a typed tool your agent can call — search the
catalog, inspect a schema, and invoke it directly.

```bash
# Claude Code
claude mcp add --transport http axiom https://api.axiomide.com/mcp \
  --header "Authorization: Bearer $AXIOM_API_KEY"
```

Claude Desktop, Cursor, or any config-based client:

```json
{
  "mcpServers": {
    "axiom": {
      "type": "http",
      "url": "https://api.axiomide.com/mcp",
      "headers": { "Authorization": "Bearer YOUR_AXIOM_API_KEY" }
    }
  }
}
```

**Call it from the CLI.**

```bash
axiom invoke christiangeorgelucas/modelcard-tools/SplitCard --input '{ ... }'
```

**Call it over HTTP.**

```bash
curl -X POST https://api.axiomide.com/invocations/v1/nodes/christiangeorgelucas/modelcard-tools/0.1.0/SplitCard \
  -H "Authorization: Bearer $AXIOM_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{ ... }'
```

> Input/output schema for each node is on the marketplace page above, or via
> `axiom inspect node christiangeorgelucas/modelcard-tools/SplitCard`.

### Get started free

Install the CLI:

```bash
# macOS / Linux — Homebrew
brew install axiomide/tap/axiom

# macOS / Linux — install script
curl -fsSL https://raw.githubusercontent.com/AxiomIDE/axiom-releases/main/install.sh | sh
```

**Windows:** download the `windows/amd64` `.zip` from the
[releases page](https://github.com/AxiomIDE/axiom-releases/releases), unzip it,
and put `axiom.exe` on your `PATH`.

Then `axiom version` to verify, `axiom login` (GitHub or Google) to authenticate,
and create an API key under **Console → API Keys**. Docs and sign-up at
**[axiomide.com](https://axiomide.com)**.

## Nodes

- **SplitCard** — split a card into its raw frontmatter YAML and Markdown body.
- **ParseFrontmatter** — parse the frontmatter into a normalized
  key → JSON-value structure.
- **DetectCardType** — classify MODEL vs DATASET card from frontmatter signal keys.
- **ExtractLicense** — `license` / `license_name` / `license_link`.
- **ExtractTags** — the `tags` list.
- **ExtractLanguages** — the `language` field, normalized to a list.
- **ExtractPipelineTag** — the `pipeline_tag` (task type).
- **ExtractBaseModel** — the `base_model` field(s).
- **ExtractLibraryName** — the `library_name`.
- **ExtractDatasets** — the `datasets` field.
- **ExtractModelIndex** — the `model-index` structured evaluation results
  (name → results[] → task + dataset + metrics), nested.
- **ListEvaluationMetrics** — the same evaluation data flattened into one row
  per metric.
- **ExtractDatasetCardFields** — `task_categories` / `size_categories` /
  `language` / `dataset_info` for a dataset card.
- **ExtractSections** — the Markdown body split into (heading, content) sections.
- **GetSection** — fetch one named section's content by heading.
- **AuditCompleteness** — which of the standard HF model-card sections are
  present vs missing.
- **ExtractCarbonFootprint** — `co2_eq_emissions` metadata.
- **ExtractWidgetExamples** — `widget` inference examples.
- **SummarizeCard** — a single-call metadata overview (type, counts, flags).

## Implementation

Frontmatter is parsed with [`gray-matter`](https://github.com/jonschlinkert/gray-matter)
(MIT), which delegates YAML parsing to js-yaml's `safeLoad` — no
code-executing tags. Input is bounded to 1 MiB overall and 64 KiB for the
frontmatter block specifically, checked *before* any YAML parse is attempted.

Markdown section splitting is this package's own regex-based ATX-heading scan
rather than a dependency: extracting "heading → following text" is a
well-defined, trivial transform, and the mature JS AST markdown parsers
(remark/unified, current `marked`) are ESM-only and cannot be `require()`d
from this package's CommonJS build.

Oversized or malformed input never crashes a node — it comes back as a
structured result (`body`-only, or a `*_parse_error` / `error` field set).

## License

MIT — see [LICENSE](LICENSE).

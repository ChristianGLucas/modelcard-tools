// Shared helpers for christiangeorgelucas/modelcard-tools.
//
// A model card (Hugging Face-style README.md) is: optional `---`-fenced YAML
// frontmatter, followed by a Markdown body. Parsing uses gray-matter (MIT),
// which delegates YAML parsing to js-yaml's `safeLoad` (no code-executing
// tags) — never `js-yaml`'s unsafe `load`.
//
// Input-surface safety:
//  - Whole input bounded to MAX_TEXT_BYTES.
//  - The frontmatter block is located with a cheap regex BEFORE any YAML
//    parsing is attempted, and is separately bounded to MAX_FRONTMATTER_BYTES
//    — real card frontmatter is a few KB; this also caps the practical blast
//    radius of an anchor/alias expansion bomb, since the parser only ever
//    sees a small, size-checked buffer.
//  - Malformed or oversized input never throws out of a node: every helper
//    returns a structured result.

import matter from 'gray-matter';

export const MAX_TEXT_BYTES = 1 * 1024 * 1024; // 1 MiB — a generous bound for a README.
export const MAX_FRONTMATTER_BYTES = 64 * 1024; // 64 KiB — real card frontmatter is a few KB.

// Exported (not inlined at the call site) so a test can verify directly that
// this options object actually disables gray-matter's eval()-based
// `javascript` fence-language engine — see the comment on the matter() call
// in parseCard for why passing engines does NOT implicitly remove it.
export const SAFE_MATTER_OPTIONS = { engines: { javascript: undefined as never } };

const FRONTMATTER_FENCE_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
const BOM = '﻿';

/**
 * Strip a leading UTF-8 BOM. Real-world model cards routinely carry one
 * (Windows editors, PowerShell `Out-File`, some export tooling) — without
 * this, the BOM defeats FRONTMATTER_FENCE_RE's start-of-string anchor and
 * an otherwise well-formed frontmatter block is silently reported as
 * absent instead of parsed.
 */
export function stripBom(text: string): string {
  return text.charCodeAt(0) === 0xfeff || text.startsWith(BOM) ? text.slice(1) : text;
}

export interface SplitResult {
  hasFrontmatter: boolean;
  frontmatterRaw: string;
  body: string;
  frontmatterOversized: boolean;
}

/** Locate the `---`-fenced frontmatter block without parsing any YAML. */
export function splitFrontmatterRaw(text: string): SplitResult {
  const stripped = stripBom(text);
  const m = FRONTMATTER_FENCE_RE.exec(stripped);
  if (!m) {
    return { hasFrontmatter: false, frontmatterRaw: '', body: stripped, frontmatterOversized: false };
  }
  const raw = m[1];
  if (Buffer.byteLength(raw, 'utf8') > MAX_FRONTMATTER_BYTES) {
    // Refuse to parse an oversized frontmatter block; treat the whole text
    // (fences included) as the body rather than guessing.
    return { hasFrontmatter: false, frontmatterRaw: '', body: stripped, frontmatterOversized: true };
  }
  return { hasFrontmatter: true, frontmatterRaw: raw, body: stripped.slice(m[0].length), frontmatterOversized: false };
}

export interface ParsedCard {
  hasFrontmatter: boolean;
  valid: boolean;
  parseError: string;
  data: Record<string, unknown>;
  body: string;
  frontmatterOversized: boolean;
}

/** Split + safely parse a card's frontmatter. Never throws. */
export function parseCard(text: string): ParsedCard {
  const split = splitFrontmatterRaw(text);
  if (split.frontmatterOversized) {
    return {
      hasFrontmatter: false,
      valid: false,
      parseError: `frontmatter block exceeds ${MAX_FRONTMATTER_BYTES} bytes`,
      data: {},
      body: split.body,
      frontmatterOversized: true,
    };
  }
  if (!split.hasFrontmatter) {
    return { hasFrontmatter: false, valid: false, parseError: '', data: {}, body: split.body, frontmatterOversized: false };
  }
  try {
    // gray-matter re-splits + parses internally (via js-yaml safeLoad); this
    // is deliberately redundant with splitFrontmatterRaw above so the size
    // check runs first, on the raw text, before any parse is attempted.
    // The `javascript` engine (an eval()-based fence-language handler,
    // selectable via a `---js` fence-language tag) is explicitly disabled.
    // gray-matter merges caller-supplied `engines` OVER its defaults
    // (Object.assign({}, defaults, opts.engines)), so merely passing
    // `{ engines: { yaml } }` does NOT remove `javascript` — every other
    // default key survives untouched. Setting it to undefined here is what
    // actually makes engine.js's `typeof engine === 'undefined'` check
    // throw "engine \"js\" is not registered" instead of eval()-ing.
    // This call is never reachable today with the strict `---\n...\n---`
    // fence this package requires (a language tag leaves no room to match),
    // but this makes that a guarantee of configuration, not an accident of
    // the caller's regex, so a future change to the fence-matching logic
    // can't silently reopen it.
    const parsed = matter(text, SAFE_MATTER_OPTIONS);
    const data = parsed.data && typeof parsed.data === 'object' ? (parsed.data as Record<string, unknown>) : {};
    return { hasFrontmatter: true, valid: true, parseError: '', data, body: parsed.content, frontmatterOversized: false };
  } catch (e) {
    return {
      hasFrontmatter: true,
      valid: false,
      parseError: e instanceof Error ? e.message : String(e),
      data: {},
      body: split.body,
      frontmatterOversized: false,
    };
  }
}

export function isOversized(text: string): boolean {
  return Buffer.byteLength(text, 'utf8') > MAX_TEXT_BYTES;
}

/** Normalize a frontmatter value that may be a scalar OR a YAML sequence into a flat string array. */
export function toStringArray(v: unknown): string[] {
  if (v === undefined || v === null) return [];
  if (Array.isArray(v)) return v.map((x) => String(x));
  return [String(v)];
}

export function toStringOrEmpty(v: unknown): string {
  if (v === undefined || v === null) return '';
  return typeof v === 'string' ? v : String(v);
}

export function isPresent(v: unknown): boolean {
  return v !== undefined && v !== null && v !== '';
}

// ---------------------------------------------------------------------------
// Markdown section splitting — a plain regex/line scan over ATX headings
// (`#`..`######`). This is intentionally hand-rolled rather than pulled from
// a markdown AST library: extracting "heading -> following text, until the
// next heading" is a well-defined, trivial transform, and the mature JS
// markdown parsers (remark/unified, current marked) are ESM-only and cannot
// be `require()`d from this package's CommonJS build.
// ---------------------------------------------------------------------------

const HEADING_RE = /^(#{1,6})[ \t]+(.+?)[ \t]*#*[ \t]*$/;

export interface RawSection {
  level: number;
  heading: string;
  content: string;
}

export interface SectionSplit {
  preamble: string;
  sections: RawSection[];
}

/** Split a Markdown body into (preamble, sections[]) by ATX heading lines. */
export function splitSections(body: string): SectionSplit {
  const lines = body.split(/\r\n|\r|\n/);
  const sections: RawSection[] = [];
  let preambleLines: string[] = [];
  let current: { level: number; heading: string; lines: string[] } | null = null;

  // Fenced code blocks (``` or ~~~) can contain lines that look like ATX
  // headings (e.g. a shell comment `# foo`); track fence state so we don't
  // split inside one.
  let inFence = false;
  let fenceMarker = '';

  for (const line of lines) {
    const fenceMatch = /^(\s*)(```+|~~~+)/.exec(line);
    if (fenceMatch) {
      const marker = fenceMatch[2][0].repeat(3);
      if (!inFence) {
        inFence = true;
        fenceMarker = marker;
      } else if (fenceMatch[2][0] === fenceMarker[0]) {
        inFence = false;
      }
      if (current) current.lines.push(line);
      else preambleLines.push(line);
      continue;
    }

    const m = !inFence ? HEADING_RE.exec(line) : null;
    if (m) {
      if (current) {
        sections.push({ level: current.level, heading: current.heading, content: current.lines.join('\n').trim() });
      }
      current = { level: m[1].length, heading: m[2].trim(), lines: [] };
    } else if (current) {
      current.lines.push(line);
    } else {
      preambleLines.push(line);
    }
  }
  if (current) {
    sections.push({ level: current.level, heading: current.heading, content: current.lines.join('\n').trim() });
  }
  return { preamble: preambleLines.join('\n').trim(), sections };
}

export function normalizeHeading(h: string): string {
  return h.trim().toLowerCase().replace(/[*_`]/g, '').replace(/\s+/g, ' ');
}

/** Word count of plain text — split on whitespace, filter empties. */
export function wordCount(text: string): number {
  const t = text.trim();
  if (!t) return 0;
  return t.split(/\s+/).length;
}

// ---------------------------------------------------------------------------
// Card-type detection
// ---------------------------------------------------------------------------

const MODEL_SIGNAL_KEYS = ['pipeline_tag', 'model-index', 'model_index', 'base_model', 'library_name'];
const DATASET_SIGNAL_KEYS = ['task_categories', 'dataset_info', 'size_categories', 'configs', 'source_datasets'];

export function detectCardType(data: Record<string, unknown>): { cardType: string; signals: string[] } {
  const modelSignals = MODEL_SIGNAL_KEYS.filter((k) => k in data);
  const datasetSignals = DATASET_SIGNAL_KEYS.filter((k) => k in data);
  if (modelSignals.length > 0 && datasetSignals.length === 0) return { cardType: 'model', signals: modelSignals };
  if (datasetSignals.length > 0 && modelSignals.length === 0) return { cardType: 'dataset', signals: datasetSignals };
  if (modelSignals.length > 0 && datasetSignals.length > 0) {
    // Both present (unusual) — prefer whichever contributed more signals.
    return modelSignals.length >= datasetSignals.length
      ? { cardType: 'model', signals: modelSignals }
      : { cardType: 'dataset', signals: datasetSignals };
  }
  return { cardType: 'unknown', signals: [] };
}

// ---------------------------------------------------------------------------
// model-index eval results
// ---------------------------------------------------------------------------

export interface FlatMetricRow {
  modelIndexName: string;
  taskName: string;
  datasetName: string;
  metricName: string;
  metricType: string;
  value: string;
  valueIsNumeric: boolean;
  valueNumber: number;
}

function metricValueParts(raw: unknown): { value: string; isNumeric: boolean; num: number } {
  if (typeof raw === 'number' && Number.isFinite(raw)) {
    return { value: String(raw), isNumeric: true, num: raw };
  }
  if (typeof raw === 'string') {
    const n = Number(raw);
    if (raw.trim() !== '' && Number.isFinite(n)) return { value: raw, isNumeric: true, num: n };
    return { value: raw, isNumeric: false, num: 0 };
  }
  if (raw === undefined || raw === null) return { value: '', isNumeric: false, num: 0 };
  return { value: String(raw), isNumeric: false, num: 0 };
}

export interface NestedMetric {
  name: string;
  type: string;
  value: string;
  valueIsNumeric: boolean;
  valueNumber: number;
}

export interface NestedResult {
  taskType: string;
  taskName: string;
  datasetType: string;
  datasetName: string;
  datasetConfig: string;
  datasetSplit: string;
  datasetRevision: string;
  metrics: NestedMetric[];
}

export interface NestedEntry {
  name: string;
  results: NestedResult[];
}

/** Normalize HF's `model-index` structure into a typed nested shape. Tolerant of missing/malformed sub-fields. */
export function normalizeModelIndex(modelIndex: unknown): NestedEntry[] {
  if (!Array.isArray(modelIndex)) return [];
  const entries: NestedEntry[] = [];
  for (const entry of modelIndex) {
    if (!entry || typeof entry !== 'object') continue;
    const e = entry as Record<string, unknown>;
    const results: NestedResult[] = [];
    const rawResults = Array.isArray(e.results) ? e.results : [];
    for (const r of rawResults) {
      if (!r || typeof r !== 'object') continue;
      const rr = r as Record<string, unknown>;
      const task = rr.task && typeof rr.task === 'object' ? (rr.task as Record<string, unknown>) : {};
      const dataset = rr.dataset && typeof rr.dataset === 'object' ? (rr.dataset as Record<string, unknown>) : {};
      const metrics: NestedMetric[] = [];
      const rawMetrics = Array.isArray(rr.metrics) ? rr.metrics : [];
      for (const met of rawMetrics) {
        if (!met || typeof met !== 'object') continue;
        const mm = met as Record<string, unknown>;
        const parts = metricValueParts(mm.value);
        metrics.push({
          name: toStringOrEmpty(mm.name),
          type: toStringOrEmpty(mm.type),
          value: parts.value,
          valueIsNumeric: parts.isNumeric,
          valueNumber: parts.num,
        });
      }
      results.push({
        taskType: toStringOrEmpty(task.type),
        taskName: toStringOrEmpty(task.name),
        datasetType: toStringOrEmpty(dataset.type),
        datasetName: toStringOrEmpty(dataset.name),
        datasetConfig: toStringOrEmpty(dataset.config),
        datasetSplit: toStringOrEmpty(dataset.split),
        datasetRevision: toStringOrEmpty(dataset.revision),
        metrics,
      });
    }
    entries.push({ name: toStringOrEmpty(e.name), results });
  }
  return entries;
}

/** Flatten normalized model-index entries into per-metric rows (name falls back task/dataset type -> name). */
export function flattenModelIndex(entries: NestedEntry[]): FlatMetricRow[] {
  const rows: FlatMetricRow[] = [];
  for (const entry of entries) {
    for (const r of entry.results) {
      const taskName = r.taskName || r.taskType;
      const datasetName = r.datasetName || r.datasetType;
      for (const m of r.metrics) {
        rows.push({
          modelIndexName: entry.name,
          taskName,
          datasetName,
          metricName: m.name || m.type,
          metricType: m.type,
          value: m.value,
          valueIsNumeric: m.valueIsNumeric,
          valueNumber: m.valueNumber,
        });
      }
    }
  }
  return rows;
}

export function safeJsonStringify(v: unknown): string {
  try {
    return JSON.stringify(v ?? null);
  } catch {
    return 'null';
  }
}

// The standard sections from the Hugging Face model-card template
// (huggingface.co/docs/hub/model-card-annotated / the modelcard.md template).
// Each entry pairs a canonical name with heading-text fragments that count
// as a match (case-insensitive substring, after normalizeHeading).
export const STANDARD_SECTIONS: { name: string; aliases: string[] }[] = [
  { name: 'Model Details', aliases: ['model details', 'model description'] },
  { name: 'Intended Uses & Limitations', aliases: ['intended uses', 'intended use', 'limitations'] },
  { name: 'How to Get Started', aliases: ['how to get started', 'how to use', 'usage', 'quickstart'] },
  { name: 'Training Data', aliases: ['training data'] },
  { name: 'Training Procedure', aliases: ['training procedure', 'training hyperparameters'] },
  { name: 'Evaluation', aliases: ['evaluation', 'evaluation results'] },
  { name: 'Bias, Risks, and Limitations', aliases: ['bias, risks, and limitations', 'bias, risks and limitations', 'risks and limitations', 'ethical considerations'] },
  { name: 'Environmental Impact', aliases: ['environmental impact', 'carbon'] },
  { name: 'Citation', aliases: ['citation', 'bibtex'] },
];

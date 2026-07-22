// Shared test context and fixture cards for modelcard-tools node unit
// tests. Not a node and not a test file (no describe/it), so it is neither
// registered as a node nor collected by jest.
import { AxiomContext, AxiomLogger, AxiomSecrets, AxiomReflection, AxiomMutation } from '../gen/axiomContext';

const reflection: AxiomReflection = {
  flow: {
    nodes: [],
    edges: [],
    loopEdges: [],
    position: { currentInstance: 0, depth: 0, loopIterations: {}, subflowStackGraphIds: [] },
    graphId: '',
  },
};

const mutation: AxiomMutation = {
  flow: {
    addNode: (_p: string, _v: string) => 0,
    addEdge: (_s: number, _d: number) => {},
  },
};

export const ctx: AxiomContext = {
  log: { debug: () => {}, info: () => {}, warn: () => {}, error: () => {} } satisfies AxiomLogger,
  secrets: { get: (_n: string): [string, boolean] => ['', false] } satisfies AxiomSecrets,
  executionId: 'test-execution-id',
  flowId: 'test-flow-id',
  tenantId: 'test-tenant-id',
  reflection,
  mutation,
};

/**
 * FIXTURE — a full-featured MODEL card, hand-authored so every field used by
 * an oracle assertion below can be transcribed BY HAND (see the *_ORACLE
 * constants) rather than derived by running this package's own nodes.
 */
export const MODEL_CARD = `---
license: apache-2.0
tags:
  - text-generation
  - pytorch
  - causal-lm
language:
  - en
  - fr
pipeline_tag: text-generation
base_model:
  - meta-llama/Llama-2-7b
library_name: transformers
datasets:
  - c4
  - the_pile
co2_eq_emissions:
  emissions: 1234.5
  source: "mlco2"
  training_type: "pretraining"
  geographical_location: "USA"
  hardware_used: "8xA100"
widget:
  - text: "Once upon a time"
    example_title: "Story starter"
model-index:
  - name: my-model
    results:
      - task:
          type: text-generation
          name: Text Generation
        dataset:
          type: c4
          name: C4
          split: validation
        metrics:
          - name: Perplexity
            type: perplexity
            value: 12.34
          - name: Accuracy
            type: accuracy
            value: "0.91"
---
# My Model

Badges here.

## Model Details

This is a causal LM.

### Model Description

Details about architecture.

## Intended Uses & Limitations

Use for text generation. Do not use for X.

## Training Data

Trained on C4 and The Pile.

## Evaluation

See results below.

## Citation

BibTeX here.
`;

export const MODEL_CARD_BODY = MODEL_CARD.slice(MODEL_CARD.indexOf('\n---\n') + '\n---\n'.length);

export const MODEL_CARD_ORACLE = {
  license: 'apache-2.0',
  tags: ['text-generation', 'pytorch', 'causal-lm'],
  languages: ['en', 'fr'],
  pipelineTag: 'text-generation',
  baseModels: ['meta-llama/Llama-2-7b'],
  libraryName: 'transformers',
  datasets: ['c4', 'the_pile'],
  cardType: 'model',
  cardTypeSignals: ['pipeline_tag', 'model-index', 'base_model', 'library_name'],
  frontmatterKeyCount: 10,
  sectionCount: 7,
  sections: [
    { level: 1, heading: 'My Model', content: 'Badges here.' },
    { level: 2, heading: 'Model Details', content: 'This is a causal LM.' },
    { level: 3, heading: 'Model Description', content: 'Details about architecture.' },
    { level: 2, heading: 'Intended Uses & Limitations', content: 'Use for text generation. Do not use for X.' },
    { level: 2, heading: 'Training Data', content: 'Trained on C4 and The Pile.' },
    { level: 2, heading: 'Evaluation', content: 'See results below.' },
    { level: 2, heading: 'Citation', content: 'BibTeX here.' },
  ],
  completenessPresent: ['Model Details', 'Intended Uses & Limitations', 'Training Data', 'Evaluation', 'Citation'],
  completenessTotal: 9,
  carbon: {
    emissionsGrams: 1234.5,
    source: 'mlco2',
    trainingType: 'pretraining',
    geographicalLocation: 'USA',
    hardwareUsed: '8xA100',
  },
  widget: [{ text: 'Once upon a time', exampleTitle: 'Story starter' }],
  modelIndex: {
    name: 'my-model',
    taskType: 'text-generation',
    taskName: 'Text Generation',
    datasetType: 'c4',
    datasetName: 'C4',
    datasetSplit: 'validation',
    metrics: [
      { name: 'Perplexity', type: 'perplexity', value: '12.34', numeric: true, num: 12.34 },
      { name: 'Accuracy', type: 'accuracy', value: '0.91', numeric: true, num: 0.91 },
    ],
  },
};

/**
 * FIXTURE — a DATASET card: only dataset-shaped signal keys, no model
 * signals, so DetectCardType must resolve to "dataset".
 */
export const DATASET_CARD = `---
license: cc-by-4.0
task_categories:
  - text-classification
  - question-answering
size_categories:
  - 10K<n<100K
language:
  - en
dataset_info:
  features:
    - name: text
      dtype: string
    - name: label
      dtype: int64
  splits:
    - name: train
      num_examples: 8000
    - name: test
      num_examples: 2000
---
# My Dataset

## Dataset Description

A dataset for testing.
`;

export const DATASET_CARD_ORACLE = {
  taskCategories: ['text-classification', 'question-answering'],
  sizeCategories: ['10K<n<100K'],
  languages: ['en'],
  cardType: 'dataset',
  cardTypeSignals: ['task_categories', 'dataset_info', 'size_categories'],
};

/** FIXTURE — plain Markdown, no frontmatter fence at all. */
export const NO_FRONTMATTER_CARD = `# Just a README

No YAML frontmatter here, just prose.
`;

/** FIXTURE — a `---` fence whose body is not valid YAML (bad indentation / tab). */
export const MALFORMED_FRONTMATTER_CARD = `---
license: mit
  bad indent: [unclosed
---
# Body
`;

/**
 * FIXTURE — a well-formed card with a leading UTF-8 BOM, exactly as many
 * real-world exports (Windows editors, PowerShell `Out-File`, etc.)
 * produce. Regression fixture: a BOM used to defeat the frontmatter-fence
 * regex and make the frontmatter invisible entirely.
 */
export const BOM_CARD = '﻿' + '---\nlicense: mit\ntags:\n  - a\n  - b\n---\n# Body\n';

export const MAX_TEXT_BYTES = 1 * 1024 * 1024;
export const MAX_FRONTMATTER_BYTES = 64 * 1024;

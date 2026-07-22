// package: christiangeorgelucas.modelcard_tools
// file: messages.proto

import * as jspb from "google-protobuf";

export class ModelCard extends jspb.Message {
  getText(): string;
  setText(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ModelCard.AsObject;
  static toObject(includeInstance: boolean, msg: ModelCard): ModelCard.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ModelCard, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ModelCard;
  static deserializeBinaryFromReader(message: ModelCard, reader: jspb.BinaryReader): ModelCard;
}

export namespace ModelCard {
  export type AsObject = {
    text: string,
  }
}

export class FrontmatterEntry extends jspb.Message {
  getKey(): string;
  setKey(value: string): void;

  getValueJson(): string;
  setValueJson(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FrontmatterEntry.AsObject;
  static toObject(includeInstance: boolean, msg: FrontmatterEntry): FrontmatterEntry.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FrontmatterEntry, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FrontmatterEntry;
  static deserializeBinaryFromReader(message: FrontmatterEntry, reader: jspb.BinaryReader): FrontmatterEntry;
}

export namespace FrontmatterEntry {
  export type AsObject = {
    key: string,
    valueJson: string,
  }
}

export class SplitCardResult extends jspb.Message {
  getHasFrontmatter(): boolean;
  setHasFrontmatter(value: boolean): void;

  getFrontmatterRaw(): string;
  setFrontmatterRaw(value: string): void;

  getBody(): string;
  setBody(value: string): void;

  getFrontmatterParseError(): boolean;
  setFrontmatterParseError(value: boolean): void;

  getParseErrorMessage(): string;
  setParseErrorMessage(value: string): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SplitCardResult.AsObject;
  static toObject(includeInstance: boolean, msg: SplitCardResult): SplitCardResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SplitCardResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SplitCardResult;
  static deserializeBinaryFromReader(message: SplitCardResult, reader: jspb.BinaryReader): SplitCardResult;
}

export namespace SplitCardResult {
  export type AsObject = {
    hasFrontmatter: boolean,
    frontmatterRaw: string,
    body: string,
    frontmatterParseError: boolean,
    parseErrorMessage: string,
    error: string,
  }
}

export class ParseFrontmatterResult extends jspb.Message {
  getHasFrontmatter(): boolean;
  setHasFrontmatter(value: boolean): void;

  getValid(): boolean;
  setValid(value: boolean): void;

  getParseError(): string;
  setParseError(value: string): void;

  clearEntriesList(): void;
  getEntriesList(): Array<FrontmatterEntry>;
  setEntriesList(value: Array<FrontmatterEntry>): void;
  addEntries(value?: FrontmatterEntry, index?: number): FrontmatterEntry;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ParseFrontmatterResult.AsObject;
  static toObject(includeInstance: boolean, msg: ParseFrontmatterResult): ParseFrontmatterResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ParseFrontmatterResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ParseFrontmatterResult;
  static deserializeBinaryFromReader(message: ParseFrontmatterResult, reader: jspb.BinaryReader): ParseFrontmatterResult;
}

export namespace ParseFrontmatterResult {
  export type AsObject = {
    hasFrontmatter: boolean,
    valid: boolean,
    parseError: string,
    entriesList: Array<FrontmatterEntry.AsObject>,
    error: string,
  }
}

export class DetectCardTypeResult extends jspb.Message {
  getCardType(): string;
  setCardType(value: string): void;

  clearSignalsList(): void;
  getSignalsList(): Array<string>;
  setSignalsList(value: Array<string>): void;
  addSignals(value: string, index?: number): string;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DetectCardTypeResult.AsObject;
  static toObject(includeInstance: boolean, msg: DetectCardTypeResult): DetectCardTypeResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DetectCardTypeResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DetectCardTypeResult;
  static deserializeBinaryFromReader(message: DetectCardTypeResult, reader: jspb.BinaryReader): DetectCardTypeResult;
}

export namespace DetectCardTypeResult {
  export type AsObject = {
    cardType: string,
    signalsList: Array<string>,
    error: string,
  }
}

export class ExtractLicenseResult extends jspb.Message {
  getPresent(): boolean;
  setPresent(value: boolean): void;

  getLicense(): string;
  setLicense(value: string): void;

  getLicenseName(): string;
  setLicenseName(value: string): void;

  getLicenseLink(): string;
  setLicenseLink(value: string): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExtractLicenseResult.AsObject;
  static toObject(includeInstance: boolean, msg: ExtractLicenseResult): ExtractLicenseResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExtractLicenseResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExtractLicenseResult;
  static deserializeBinaryFromReader(message: ExtractLicenseResult, reader: jspb.BinaryReader): ExtractLicenseResult;
}

export namespace ExtractLicenseResult {
  export type AsObject = {
    present: boolean,
    license: string,
    licenseName: string,
    licenseLink: string,
    error: string,
  }
}

export class ExtractTagsResult extends jspb.Message {
  clearTagsList(): void;
  getTagsList(): Array<string>;
  setTagsList(value: Array<string>): void;
  addTags(value: string, index?: number): string;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExtractTagsResult.AsObject;
  static toObject(includeInstance: boolean, msg: ExtractTagsResult): ExtractTagsResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExtractTagsResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExtractTagsResult;
  static deserializeBinaryFromReader(message: ExtractTagsResult, reader: jspb.BinaryReader): ExtractTagsResult;
}

export namespace ExtractTagsResult {
  export type AsObject = {
    tagsList: Array<string>,
    error: string,
  }
}

export class ExtractLanguagesResult extends jspb.Message {
  clearLanguagesList(): void;
  getLanguagesList(): Array<string>;
  setLanguagesList(value: Array<string>): void;
  addLanguages(value: string, index?: number): string;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExtractLanguagesResult.AsObject;
  static toObject(includeInstance: boolean, msg: ExtractLanguagesResult): ExtractLanguagesResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExtractLanguagesResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExtractLanguagesResult;
  static deserializeBinaryFromReader(message: ExtractLanguagesResult, reader: jspb.BinaryReader): ExtractLanguagesResult;
}

export namespace ExtractLanguagesResult {
  export type AsObject = {
    languagesList: Array<string>,
    error: string,
  }
}

export class ExtractPipelineTagResult extends jspb.Message {
  getPresent(): boolean;
  setPresent(value: boolean): void;

  getPipelineTag(): string;
  setPipelineTag(value: string): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExtractPipelineTagResult.AsObject;
  static toObject(includeInstance: boolean, msg: ExtractPipelineTagResult): ExtractPipelineTagResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExtractPipelineTagResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExtractPipelineTagResult;
  static deserializeBinaryFromReader(message: ExtractPipelineTagResult, reader: jspb.BinaryReader): ExtractPipelineTagResult;
}

export namespace ExtractPipelineTagResult {
  export type AsObject = {
    present: boolean,
    pipelineTag: string,
    error: string,
  }
}

export class ExtractBaseModelResult extends jspb.Message {
  clearBaseModelsList(): void;
  getBaseModelsList(): Array<string>;
  setBaseModelsList(value: Array<string>): void;
  addBaseModels(value: string, index?: number): string;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExtractBaseModelResult.AsObject;
  static toObject(includeInstance: boolean, msg: ExtractBaseModelResult): ExtractBaseModelResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExtractBaseModelResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExtractBaseModelResult;
  static deserializeBinaryFromReader(message: ExtractBaseModelResult, reader: jspb.BinaryReader): ExtractBaseModelResult;
}

export namespace ExtractBaseModelResult {
  export type AsObject = {
    baseModelsList: Array<string>,
    error: string,
  }
}

export class ExtractLibraryNameResult extends jspb.Message {
  getPresent(): boolean;
  setPresent(value: boolean): void;

  getLibraryName(): string;
  setLibraryName(value: string): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExtractLibraryNameResult.AsObject;
  static toObject(includeInstance: boolean, msg: ExtractLibraryNameResult): ExtractLibraryNameResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExtractLibraryNameResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExtractLibraryNameResult;
  static deserializeBinaryFromReader(message: ExtractLibraryNameResult, reader: jspb.BinaryReader): ExtractLibraryNameResult;
}

export namespace ExtractLibraryNameResult {
  export type AsObject = {
    present: boolean,
    libraryName: string,
    error: string,
  }
}

export class ExtractDatasetsResult extends jspb.Message {
  clearDatasetsList(): void;
  getDatasetsList(): Array<string>;
  setDatasetsList(value: Array<string>): void;
  addDatasets(value: string, index?: number): string;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExtractDatasetsResult.AsObject;
  static toObject(includeInstance: boolean, msg: ExtractDatasetsResult): ExtractDatasetsResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExtractDatasetsResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExtractDatasetsResult;
  static deserializeBinaryFromReader(message: ExtractDatasetsResult, reader: jspb.BinaryReader): ExtractDatasetsResult;
}

export namespace ExtractDatasetsResult {
  export type AsObject = {
    datasetsList: Array<string>,
    error: string,
  }
}

export class EvalMetric extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getType(): string;
  setType(value: string): void;

  getValue(): string;
  setValue(value: string): void;

  getValueIsNumeric(): boolean;
  setValueIsNumeric(value: boolean): void;

  getValueNumber(): number;
  setValueNumber(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EvalMetric.AsObject;
  static toObject(includeInstance: boolean, msg: EvalMetric): EvalMetric.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EvalMetric, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EvalMetric;
  static deserializeBinaryFromReader(message: EvalMetric, reader: jspb.BinaryReader): EvalMetric;
}

export namespace EvalMetric {
  export type AsObject = {
    name: string,
    type: string,
    value: string,
    valueIsNumeric: boolean,
    valueNumber: number,
  }
}

export class EvalDatasetResult extends jspb.Message {
  getTaskType(): string;
  setTaskType(value: string): void;

  getTaskName(): string;
  setTaskName(value: string): void;

  getDatasetType(): string;
  setDatasetType(value: string): void;

  getDatasetName(): string;
  setDatasetName(value: string): void;

  getDatasetConfig(): string;
  setDatasetConfig(value: string): void;

  getDatasetSplit(): string;
  setDatasetSplit(value: string): void;

  getDatasetRevision(): string;
  setDatasetRevision(value: string): void;

  clearMetricsList(): void;
  getMetricsList(): Array<EvalMetric>;
  setMetricsList(value: Array<EvalMetric>): void;
  addMetrics(value?: EvalMetric, index?: number): EvalMetric;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EvalDatasetResult.AsObject;
  static toObject(includeInstance: boolean, msg: EvalDatasetResult): EvalDatasetResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EvalDatasetResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EvalDatasetResult;
  static deserializeBinaryFromReader(message: EvalDatasetResult, reader: jspb.BinaryReader): EvalDatasetResult;
}

export namespace EvalDatasetResult {
  export type AsObject = {
    taskType: string,
    taskName: string,
    datasetType: string,
    datasetName: string,
    datasetConfig: string,
    datasetSplit: string,
    datasetRevision: string,
    metricsList: Array<EvalMetric.AsObject>,
  }
}

export class ModelIndexEntry extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  clearResultsList(): void;
  getResultsList(): Array<EvalDatasetResult>;
  setResultsList(value: Array<EvalDatasetResult>): void;
  addResults(value?: EvalDatasetResult, index?: number): EvalDatasetResult;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ModelIndexEntry.AsObject;
  static toObject(includeInstance: boolean, msg: ModelIndexEntry): ModelIndexEntry.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ModelIndexEntry, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ModelIndexEntry;
  static deserializeBinaryFromReader(message: ModelIndexEntry, reader: jspb.BinaryReader): ModelIndexEntry;
}

export namespace ModelIndexEntry {
  export type AsObject = {
    name: string,
    resultsList: Array<EvalDatasetResult.AsObject>,
  }
}

export class ModelIndexResult extends jspb.Message {
  getPresent(): boolean;
  setPresent(value: boolean): void;

  clearEntriesList(): void;
  getEntriesList(): Array<ModelIndexEntry>;
  setEntriesList(value: Array<ModelIndexEntry>): void;
  addEntries(value?: ModelIndexEntry, index?: number): ModelIndexEntry;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ModelIndexResult.AsObject;
  static toObject(includeInstance: boolean, msg: ModelIndexResult): ModelIndexResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ModelIndexResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ModelIndexResult;
  static deserializeBinaryFromReader(message: ModelIndexResult, reader: jspb.BinaryReader): ModelIndexResult;
}

export namespace ModelIndexResult {
  export type AsObject = {
    present: boolean,
    entriesList: Array<ModelIndexEntry.AsObject>,
    error: string,
  }
}

export class EvaluationMetricRow extends jspb.Message {
  getModelIndexName(): string;
  setModelIndexName(value: string): void;

  getTaskName(): string;
  setTaskName(value: string): void;

  getDatasetName(): string;
  setDatasetName(value: string): void;

  getMetricName(): string;
  setMetricName(value: string): void;

  getMetricType(): string;
  setMetricType(value: string): void;

  getValue(): string;
  setValue(value: string): void;

  getValueIsNumeric(): boolean;
  setValueIsNumeric(value: boolean): void;

  getValueNumber(): number;
  setValueNumber(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EvaluationMetricRow.AsObject;
  static toObject(includeInstance: boolean, msg: EvaluationMetricRow): EvaluationMetricRow.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EvaluationMetricRow, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EvaluationMetricRow;
  static deserializeBinaryFromReader(message: EvaluationMetricRow, reader: jspb.BinaryReader): EvaluationMetricRow;
}

export namespace EvaluationMetricRow {
  export type AsObject = {
    modelIndexName: string,
    taskName: string,
    datasetName: string,
    metricName: string,
    metricType: string,
    value: string,
    valueIsNumeric: boolean,
    valueNumber: number,
  }
}

export class ListEvaluationMetricsResult extends jspb.Message {
  getPresent(): boolean;
  setPresent(value: boolean): void;

  clearMetricsList(): void;
  getMetricsList(): Array<EvaluationMetricRow>;
  setMetricsList(value: Array<EvaluationMetricRow>): void;
  addMetrics(value?: EvaluationMetricRow, index?: number): EvaluationMetricRow;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListEvaluationMetricsResult.AsObject;
  static toObject(includeInstance: boolean, msg: ListEvaluationMetricsResult): ListEvaluationMetricsResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListEvaluationMetricsResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListEvaluationMetricsResult;
  static deserializeBinaryFromReader(message: ListEvaluationMetricsResult, reader: jspb.BinaryReader): ListEvaluationMetricsResult;
}

export namespace ListEvaluationMetricsResult {
  export type AsObject = {
    present: boolean,
    metricsList: Array<EvaluationMetricRow.AsObject>,
    error: string,
  }
}

export class ExtractDatasetCardFieldsResult extends jspb.Message {
  clearTaskCategoriesList(): void;
  getTaskCategoriesList(): Array<string>;
  setTaskCategoriesList(value: Array<string>): void;
  addTaskCategories(value: string, index?: number): string;

  clearSizeCategoriesList(): void;
  getSizeCategoriesList(): Array<string>;
  setSizeCategoriesList(value: Array<string>): void;
  addSizeCategories(value: string, index?: number): string;

  clearLanguagesList(): void;
  getLanguagesList(): Array<string>;
  setLanguagesList(value: Array<string>): void;
  addLanguages(value: string, index?: number): string;

  getHasDatasetInfo(): boolean;
  setHasDatasetInfo(value: boolean): void;

  getDatasetInfoJson(): string;
  setDatasetInfoJson(value: string): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExtractDatasetCardFieldsResult.AsObject;
  static toObject(includeInstance: boolean, msg: ExtractDatasetCardFieldsResult): ExtractDatasetCardFieldsResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExtractDatasetCardFieldsResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExtractDatasetCardFieldsResult;
  static deserializeBinaryFromReader(message: ExtractDatasetCardFieldsResult, reader: jspb.BinaryReader): ExtractDatasetCardFieldsResult;
}

export namespace ExtractDatasetCardFieldsResult {
  export type AsObject = {
    taskCategoriesList: Array<string>,
    sizeCategoriesList: Array<string>,
    languagesList: Array<string>,
    hasDatasetInfo: boolean,
    datasetInfoJson: string,
    error: string,
  }
}

export class MarkdownSection extends jspb.Message {
  getLevel(): number;
  setLevel(value: number): void;

  getHeading(): string;
  setHeading(value: string): void;

  getContent(): string;
  setContent(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MarkdownSection.AsObject;
  static toObject(includeInstance: boolean, msg: MarkdownSection): MarkdownSection.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MarkdownSection, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MarkdownSection;
  static deserializeBinaryFromReader(message: MarkdownSection, reader: jspb.BinaryReader): MarkdownSection;
}

export namespace MarkdownSection {
  export type AsObject = {
    level: number,
    heading: string,
    content: string,
  }
}

export class ExtractSectionsResult extends jspb.Message {
  clearSectionsList(): void;
  getSectionsList(): Array<MarkdownSection>;
  setSectionsList(value: Array<MarkdownSection>): void;
  addSections(value?: MarkdownSection, index?: number): MarkdownSection;

  getPreamble(): string;
  setPreamble(value: string): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExtractSectionsResult.AsObject;
  static toObject(includeInstance: boolean, msg: ExtractSectionsResult): ExtractSectionsResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExtractSectionsResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExtractSectionsResult;
  static deserializeBinaryFromReader(message: ExtractSectionsResult, reader: jspb.BinaryReader): ExtractSectionsResult;
}

export namespace ExtractSectionsResult {
  export type AsObject = {
    sectionsList: Array<MarkdownSection.AsObject>,
    preamble: string,
    error: string,
  }
}

export class GetSectionRequest extends jspb.Message {
  getText(): string;
  setText(value: string): void;

  getHeading(): string;
  setHeading(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSectionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetSectionRequest): GetSectionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetSectionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSectionRequest;
  static deserializeBinaryFromReader(message: GetSectionRequest, reader: jspb.BinaryReader): GetSectionRequest;
}

export namespace GetSectionRequest {
  export type AsObject = {
    text: string,
    heading: string,
  }
}

export class GetSectionResult extends jspb.Message {
  getFound(): boolean;
  setFound(value: boolean): void;

  hasSection(): boolean;
  clearSection(): void;
  getSection(): MarkdownSection | undefined;
  setSection(value?: MarkdownSection): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSectionResult.AsObject;
  static toObject(includeInstance: boolean, msg: GetSectionResult): GetSectionResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetSectionResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSectionResult;
  static deserializeBinaryFromReader(message: GetSectionResult, reader: jspb.BinaryReader): GetSectionResult;
}

export namespace GetSectionResult {
  export type AsObject = {
    found: boolean,
    section?: MarkdownSection.AsObject,
    error: string,
  }
}

export class SectionPresence extends jspb.Message {
  getStandardSection(): string;
  setStandardSection(value: string): void;

  getPresent(): boolean;
  setPresent(value: boolean): void;

  getMatchedHeading(): string;
  setMatchedHeading(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SectionPresence.AsObject;
  static toObject(includeInstance: boolean, msg: SectionPresence): SectionPresence.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SectionPresence, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SectionPresence;
  static deserializeBinaryFromReader(message: SectionPresence, reader: jspb.BinaryReader): SectionPresence;
}

export namespace SectionPresence {
  export type AsObject = {
    standardSection: string,
    present: boolean,
    matchedHeading: string,
  }
}

export class AuditCompletenessResult extends jspb.Message {
  clearSectionsList(): void;
  getSectionsList(): Array<SectionPresence>;
  setSectionsList(value: Array<SectionPresence>): void;
  addSections(value?: SectionPresence, index?: number): SectionPresence;

  getPresentCount(): number;
  setPresentCount(value: number): void;

  getTotalCount(): number;
  setTotalCount(value: number): void;

  getCompletenessRatio(): number;
  setCompletenessRatio(value: number): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AuditCompletenessResult.AsObject;
  static toObject(includeInstance: boolean, msg: AuditCompletenessResult): AuditCompletenessResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AuditCompletenessResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AuditCompletenessResult;
  static deserializeBinaryFromReader(message: AuditCompletenessResult, reader: jspb.BinaryReader): AuditCompletenessResult;
}

export namespace AuditCompletenessResult {
  export type AsObject = {
    sectionsList: Array<SectionPresence.AsObject>,
    presentCount: number,
    totalCount: number,
    completenessRatio: number,
    error: string,
  }
}

export class CarbonFootprint extends jspb.Message {
  getEmissionsGrams(): number;
  setEmissionsGrams(value: number): void;

  getEmissionsNumeric(): boolean;
  setEmissionsNumeric(value: boolean): void;

  getSource(): string;
  setSource(value: string): void;

  getTrainingType(): string;
  setTrainingType(value: string): void;

  getGeographicalLocation(): string;
  setGeographicalLocation(value: string): void;

  getHardwareUsed(): string;
  setHardwareUsed(value: string): void;

  getRawJson(): string;
  setRawJson(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CarbonFootprint.AsObject;
  static toObject(includeInstance: boolean, msg: CarbonFootprint): CarbonFootprint.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CarbonFootprint, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CarbonFootprint;
  static deserializeBinaryFromReader(message: CarbonFootprint, reader: jspb.BinaryReader): CarbonFootprint;
}

export namespace CarbonFootprint {
  export type AsObject = {
    emissionsGrams: number,
    emissionsNumeric: boolean,
    source: string,
    trainingType: string,
    geographicalLocation: string,
    hardwareUsed: string,
    rawJson: string,
  }
}

export class ExtractCarbonFootprintResult extends jspb.Message {
  getPresent(): boolean;
  setPresent(value: boolean): void;

  hasFootprint(): boolean;
  clearFootprint(): void;
  getFootprint(): CarbonFootprint | undefined;
  setFootprint(value?: CarbonFootprint): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExtractCarbonFootprintResult.AsObject;
  static toObject(includeInstance: boolean, msg: ExtractCarbonFootprintResult): ExtractCarbonFootprintResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExtractCarbonFootprintResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExtractCarbonFootprintResult;
  static deserializeBinaryFromReader(message: ExtractCarbonFootprintResult, reader: jspb.BinaryReader): ExtractCarbonFootprintResult;
}

export namespace ExtractCarbonFootprintResult {
  export type AsObject = {
    present: boolean,
    footprint?: CarbonFootprint.AsObject,
    error: string,
  }
}

export class WidgetExample extends jspb.Message {
  getText(): string;
  setText(value: string): void;

  getExampleTitle(): string;
  setExampleTitle(value: string): void;

  getRawJson(): string;
  setRawJson(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WidgetExample.AsObject;
  static toObject(includeInstance: boolean, msg: WidgetExample): WidgetExample.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: WidgetExample, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WidgetExample;
  static deserializeBinaryFromReader(message: WidgetExample, reader: jspb.BinaryReader): WidgetExample;
}

export namespace WidgetExample {
  export type AsObject = {
    text: string,
    exampleTitle: string,
    rawJson: string,
  }
}

export class ExtractWidgetExamplesResult extends jspb.Message {
  getPresent(): boolean;
  setPresent(value: boolean): void;

  clearExamplesList(): void;
  getExamplesList(): Array<WidgetExample>;
  setExamplesList(value: Array<WidgetExample>): void;
  addExamples(value?: WidgetExample, index?: number): WidgetExample;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExtractWidgetExamplesResult.AsObject;
  static toObject(includeInstance: boolean, msg: ExtractWidgetExamplesResult): ExtractWidgetExamplesResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExtractWidgetExamplesResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExtractWidgetExamplesResult;
  static deserializeBinaryFromReader(message: ExtractWidgetExamplesResult, reader: jspb.BinaryReader): ExtractWidgetExamplesResult;
}

export namespace ExtractWidgetExamplesResult {
  export type AsObject = {
    present: boolean,
    examplesList: Array<WidgetExample.AsObject>,
    error: string,
  }
}

export class SummarizeCardResult extends jspb.Message {
  getHasFrontmatter(): boolean;
  setHasFrontmatter(value: boolean): void;

  getFrontmatterValid(): boolean;
  setFrontmatterValid(value: boolean): void;

  getCardType(): string;
  setCardType(value: string): void;

  getFrontmatterKeyCount(): number;
  setFrontmatterKeyCount(value: number): void;

  getTagCount(): number;
  setTagCount(value: number): void;

  getLanguageCount(): number;
  setLanguageCount(value: number): void;

  getSectionCount(): number;
  setSectionCount(value: number): void;

  getBodyWordCount(): number;
  setBodyWordCount(value: number): void;

  getHasLicense(): boolean;
  setHasLicense(value: boolean): void;

  getHasEvalResults(): boolean;
  setHasEvalResults(value: boolean): void;

  getHasWidgetExamples(): boolean;
  setHasWidgetExamples(value: boolean): void;

  getHasCarbonFootprint(): boolean;
  setHasCarbonFootprint(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SummarizeCardResult.AsObject;
  static toObject(includeInstance: boolean, msg: SummarizeCardResult): SummarizeCardResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SummarizeCardResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SummarizeCardResult;
  static deserializeBinaryFromReader(message: SummarizeCardResult, reader: jspb.BinaryReader): SummarizeCardResult;
}

export namespace SummarizeCardResult {
  export type AsObject = {
    hasFrontmatter: boolean,
    frontmatterValid: boolean,
    cardType: string,
    frontmatterKeyCount: number,
    tagCount: number,
    languageCount: number,
    sectionCount: number,
    bodyWordCount: number,
    hasLicense: boolean,
    hasEvalResults: boolean,
    hasWidgetExamples: boolean,
    hasCarbonFootprint: boolean,
    error: string,
  }
}


/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */
/**
 * Language of this, as ISO 639-1 code. Additionally 'none' for no language.
 */
export declare type ISOLanguage =
  | 'none'
  | 'aa'
  | 'ab'
  | 'ae'
  | 'af'
  | 'ak'
  | 'am'
  | 'an'
  | 'ar'
  | 'as'
  | 'av'
  | 'ay'
  | 'az'
  | 'ba'
  | 'be'
  | 'bg'
  | 'bh'
  | 'bi'
  | 'bm'
  | 'bn'
  | 'bo'
  | 'br'
  | 'bs'
  | 'ca'
  | 'ce'
  | 'ch'
  | 'co'
  | 'cr'
  | 'cs'
  | 'cu'
  | 'cv'
  | 'cy'
  | 'da'
  | 'de'
  | 'dv'
  | 'dz'
  | 'ee'
  | 'el'
  | 'en'
  | 'eo'
  | 'es'
  | 'et'
  | 'eu'
  | 'fa'
  | 'ff'
  | 'fi'
  | 'fj'
  | 'fo'
  | 'fr'
  | 'fy'
  | 'ga'
  | 'gd'
  | 'gl'
  | 'gn'
  | 'gu'
  | 'gv'
  | 'ha'
  | 'he'
  | 'hi'
  | 'ho'
  | 'hr'
  | 'ht'
  | 'hu'
  | 'hy'
  | 'hz'
  | 'ia'
  | 'id'
  | 'ie'
  | 'ig'
  | 'ii'
  | 'ik'
  | 'io'
  | 'is'
  | 'it'
  | 'iu'
  | 'ja'
  | 'jv'
  | 'ka'
  | 'kg'
  | 'ki'
  | 'kj'
  | 'kk'
  | 'kl'
  | 'km'
  | 'kn'
  | 'ko'
  | 'kr'
  | 'ks'
  | 'ku'
  | 'kv'
  | 'kw'
  | 'ky'
  | 'la'
  | 'lb'
  | 'lg'
  | 'li'
  | 'ln'
  | 'lo'
  | 'lt'
  | 'lu'
  | 'lv'
  | 'mg'
  | 'mh'
  | 'mi'
  | 'mk'
  | 'ml'
  | 'mn'
  | 'mr'
  | 'ms'
  | 'mt'
  | 'my'
  | 'na'
  | 'nb'
  | 'nd'
  | 'ne'
  | 'ng'
  | 'nl'
  | 'nn'
  | 'no'
  | 'nr'
  | 'nv'
  | 'ny'
  | 'oc'
  | 'oj'
  | 'om'
  | 'or'
  | 'os'
  | 'pa'
  | 'pi'
  | 'pl'
  | 'ps'
  | 'pt'
  | 'qu'
  | 'rm'
  | 'rn'
  | 'ro'
  | 'ru'
  | 'rw'
  | 'sa'
  | 'sc'
  | 'sd'
  | 'se'
  | 'sg'
  | 'si'
  | 'sk'
  | 'sl'
  | 'sm'
  | 'sn'
  | 'so'
  | 'sq'
  | 'sr'
  | 'ss'
  | 'st'
  | 'su'
  | 'sv'
  | 'sw'
  | 'ta'
  | 'te'
  | 'tg'
  | 'th'
  | 'ti'
  | 'tk'
  | 'tl'
  | 'tn'
  | 'to'
  | 'tr'
  | 'ts'
  | 'tt'
  | 'tw'
  | 'ty'
  | 'ug'
  | 'uk'
  | 'ur'
  | 'uz'
  | 've'
  | 'vi'
  | 'vo'
  | 'wa'
  | 'wo'
  | 'xh'
  | 'yi'
  | 'yo'
  | 'za'
  | 'zh'
  | 'zu';
/**
 * Represents a single question of the questionnaire.
 */
export declare type Question =
  | QuestionWithoutOptions
  | QuestionWithOptions
  | NumericQuestion;
/**
 * Represents a question. The answer is a choice of yes/no, text or date.
 */
export declare type QuestionWithoutOptions = CommonQuestionFields & {
  /**
   * Type of the question.
   */
  type: 'boolean' | 'date' | 'text';
};
/**
 * Logic expression used to compute this variable. Defaults to true.
 */
export declare type LogicExpression =
  | LogicOperator
  | LogicVariable
  | LogicConstant;
export declare type LogicOperator =
  | LogicIf
  | LogicReduce
  | LogicSome
  | LogicEquals
  | LogicGreaterEqual
  | LogicNot
  | LogicLessEqual
  | LogicPlus
  | LogicMinus
  | LogicTimes
  | LogicDivide
  | LogicAnd
  | LogicOr
  | LogicIn
  | LogicGreater
  | LogicLess
  | LogicConvertToDateString
  | Log10
  | Round;
export declare type LogicConstant = number | string | boolean;
/**
 * Type of the question.
 */
export declare type QuestionType =
  | 'boolean'
  | 'date'
  | 'text'
  | 'number'
  | 'select'
  | 'multiselect';
/**
 * Represents a question with predefined answers to select.
 */
export declare type QuestionWithOptions = CommonQuestionFields & {
  /**
   * Answer options for Select/Multiselect questions.
   */
  options?: Option[];
  /**
   * Type of the question.
   */
  type: 'select' | 'multiselect';
};
/**
 * Represents a question with numeric answer.
 */
export declare type NumericQuestion = CommonQuestionFields & {
  numericOptions?: NumericOptions;
  /**
   * Type of the question.
   */
  type: 'number';
};
/**
 * The questionnaire.
 */
export interface Questionnaire {
  /**
   * Unique, assigned identifier. Machine friendly.
   */
  id: string;
  language: ISOLanguage;
  /**
   * Unique, assigned identifier. Machine friendly.
   */
  title: string;
  meta: QuestionnaireMeta;
  /**
   * All questions, shown one after another, in order.
   */
  questions: Question[];
  /**
   * All result categories. When all questions are answered,
   * the result for each result category is computed.
   */
  resultCategories: ResultCategory[];
  /**
   * File format/api version in semver.
   */
  schemaVersion: string;
  /**
   * All variables, refreshed after each update to any answer.
   */
  variables: Variable[];
  /**
   * Version of this question in semver.
   */
  version: number;
  /**
   * Test cases for this questionnaire.
   */
  testCases?: TestCase[];
}
/**
 * Meta-Information for a questionnaire.
 */
export interface QuestionnaireMeta {
  author: string;
  /**
   * Creation date as ISO 8601 string
   */
  creationDate: string;
  description?: string;
  /**
   * Expiration date as ISO 8601 string
   */
  experiationDate?: string;
  availableLanguages: ISOLanguage[];
  publisher?: string;
  /**
   * Region restriction (e.g. regions in which this questionnaire is valid) as list of ISO 3166 ids.
   */
  regions?: string[];
}
/**
 * Represents the common fields of every question.
 */
export interface CommonQuestionFields {
  /**
   * Optional human-readable details or clarification about this question.
   */
  details?: string;
  enableWhenExpression?: LogicExpression;
  /**
   * Unique id for referring this question in logic expressions.
   */
  id: string;
  /**
   * Boolean indicating whether the question is optional or not.
   */
  optional?: boolean;
  /**
   * Human-readable question text, can be localized.
   */
  text: string;
  type: QuestionType;
}
export interface LogicIf {
  if: [LogicExpression, LogicExpression, LogicExpression];
}
export interface LogicReduce {
  reduce: [LogicExpression, LogicExpression, LogicExpression];
}
export interface LogicSome {
  some: [LogicExpression, ...LogicExpression[]];
}
export interface LogicEquals {
  '==': [LogicExpression, LogicExpression];
}
export interface LogicGreaterEqual {
  '>=': [LogicExpression, LogicExpression];
}
export interface LogicNot {
  '!': LogicExpression | [LogicExpression];
}
export interface LogicLessEqual {
  '<=': [LogicExpression, LogicExpression];
}
export interface LogicPlus {
  '+': [LogicExpression, LogicExpression, ...LogicExpression[]];
}
export interface LogicMinus {
  '-': [LogicExpression, LogicExpression];
}
export interface LogicTimes {
  '*': [LogicExpression, LogicExpression, ...LogicExpression[]];
}
export interface LogicDivide {
  '/': [LogicExpression, LogicExpression];
}
export interface LogicAnd {
  and: [LogicExpression, ...LogicExpression[]];
}
export interface LogicOr {
  or: [LogicExpression, ...LogicExpression[]];
}
export interface LogicIn {
  in: [
    LogicExpression | LogicExpression[],
    LogicExpression | LogicExpression[]
  ];
}
export interface LogicGreater {
  '>': [LogicExpression, LogicExpression];
}
export interface LogicLess {
  '<': [LogicExpression, LogicExpression];
}
export interface LogicConvertToDateString {
  convert_to_date_string: [LogicExpression, LogicExpression];
}
export interface Log10 {
  log10: LogicExpression | [LogicExpression];
}
export interface Round {
  round: LogicExpression | [LogicExpression];
}
export interface LogicVariable {
  var: string;
}
/**
 * Option for multi-select questions.
 */
export interface Option {
  [x: string]: boolean;
  /**
   * Human-Readable formulation of this option as yes/no question.
   * This is for use-cases where multi-selects are not possible in the UI,
   * for example telephone hotlines.
   */
  asQuestion?: string;
  /**
   * Human-Readable answer, can be localized.
   */
  text: string;
  /**
   * Value used for evaluating logic expressions.
   */
  value: string;
  scores?: Scores;
}
export interface Scores {
  [k: string]: number;
}
/**
 * Option for numeric questions.
 * Answer options for Select/Multiselect questions.
 */
export interface NumericOptions {
  /**
   * Default value
   */
  defaultValue?: number;
  /**
   * maximal value
   */
  max?: number;
  /**
   * Minimal value
   */
  min?: number;
  /**
   * Step size
   */
  step?: number;
}
/**
 * Represents a result category. A category might yield exactly one or zero results at the end of the questionnaire.
 */
export interface ResultCategory {
  /**
   * A human readable description for the result category. Can be localized.
   */
  description: string;
  /**
   * A unique identifier for this result category.
   */
  id: string;
  /**
   * A list of results for this category.
   */
  results: Result[];
}
/**
 * Represents a single result.
 * The value of the logic expression yielding true or false. The first result in the result category yielding true will be
 * used as result. If no result evaluates to true, no result is shown for this category.
 */
export interface Result {
  /**
   * A unique identifier for this result.
   */
  id: string;
  /**
   * A human readable text for this result. Can be localized.
   */
  text: string;
  expression: LogicExpression;
}
/**
 * Represents a variable which is computed from the given answers or other variables.
 */
export interface Variable {
  /**
   * Unique id for referring this variable in logic expressions.
   */
  id: string;
  expression: LogicExpression;
}
/**
 * One test case that simulates a virtual patient and the results they should receive.
 */
export interface TestCase {
  /**
   * The description of the test case.
   */
  description: string;
  /**
   * Object of given answers in the form: 'questionId: answer'. Answer can be the answerId for selects, a value, or an array for multi-selects.
   */
  answers: {
    [k: string]: any;
  };
  /**
   * Object of obtained results in the form: 'resultCategoryId: resultId'.
   */
  results: {
    [k: string]: string;
  };
  /**
   * Object of expected variables in the form: 'variableId: value'.
   */
  variables?: {
    [k: string]: any;
  };
  /**
   * Options to configure the behavior of the test case runner.
   */
  options?: {
    /**
     * The simulated time of execution. Important for date questions, where the evaluation looks for time periods, like the last 14 days. Example: '2020-03-18'
     */
    fillInDate?: string;
    /**
     * If false (default), the provided results have to appear after the questionnaire execution, additional results are allowed. If set, exactly the provided results have to appear.
     */
    strictResults?: boolean;
    /**
     * If set to 0 (default): missing answer in the test case are not answered. If set to >= 1: missing answers in the test case are randomly answered. The number decides the number of random runs of this test case.
     */
    randomRuns?: number;
  };
}

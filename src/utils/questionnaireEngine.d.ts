import { Question, Questionnaire } from './models/Questionnaire.generated';
import { Primitive } from './primitive';
export declare type Result = {
  resultCategory: {
    id: string;
    description: string;
  };
  result: {
    id: string;
    text: string;
  };
};
export declare type QuestionnaireResult = {
  questionnaireId: string;
  questionnaireVersion: number;
  results: Result[];
  answers: {
    [answerId: string]: RawAnswer;
  };
  exports: QuestionnaireExport[];
};
export declare type QuestionnaireExport = {
  /**
   * Id of the export
   * @example covapp - for QR Code of the Charite
   */
  id: string;
  /**
   * Map of export variables
   */
  mapping: {
    [key: string]: string;
  };
};
declare type GivenAnswer = {
  questionId: string;
  rawAnswer: RawAnswer;
};
export declare type RawAnswer = Primitive | Primitive[] | undefined;
declare type AnswersPersistence = {
  answers: GivenAnswer[];
  version: number;
  timeOfExecution?: number;
};
export declare class QuestionnaireEngine {
  private readonly questionnaire;
  private readonly questions;
  private variables;
  private resultCategories;
  private data;
  private readonly timeOfExecution?;
  private givenAnswers;
  constructor(newQuestionnaire: Questionnaire, timeOfExecution?: number);
  /**
   *
   * @returns The next Question or `undefined` if there is none.
   */
  nextQuestion(): Question | undefined;
  previousQuestion(currentQuestionId: string): {
    question: Question;
    answer?: RawAnswer;
  };
  getAnswersPersistence(): AnswersPersistence;
  setAnswersPersistence(answersPersistence: AnswersPersistence): void;
  setAnswer(questionId: string, rawAnswer: RawAnswer): void;
  private removeAnswersStartingFrom;
  getProgress(): number;
  getNextQuestion(currentQuestionId: string): Question | undefined;
  private getQuestionIndex;
  private getCurrentQuestionId;
  private processAnswerWithOptions;
  private mergeScores;
  private getQuestionById;
  private recreateDataObject;
  private calculateVariables;
  getVariables(): {
    [key: string]: any;
  };
  /**
   * SHOULD NOT BE USED
   * Exposes the Internal State for debugging purposes.
   * @returns Internal State
   */
  getDataObjectForDeveloping(): any;
  getCategoryResults(): Result[];
  getResults(): QuestionnaireResult;
  private setAdditionalJsonLogicOperators;
}
export {};

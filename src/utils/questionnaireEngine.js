'use strict';
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.QuestionnaireEngine = void 0;
var jsonLogic = __importStar(require('json-logic-js'));
var fast_deep_equal_1 = __importDefault(require('fast-deep-equal'));
var primitive_1 = require('./primitive');
var printf_1 = __importDefault(require('printf'));
var dayjs_1 = __importDefault(require('dayjs'));
var QuestionnaireEngine = /** @class */ (function () {
  function QuestionnaireEngine(newQuestionnaire, timeOfExecution) {
    this.questions = [];
    this.variables = [];
    this.resultCategories = [];
    this.data = {};
    this.givenAnswers = [];
    this.questionnaire = newQuestionnaire;
    this.questions = newQuestionnaire.questions;
    this.variables = newQuestionnaire.variables;
    this.resultCategories = newQuestionnaire.resultCategories;
    this.timeOfExecution = timeOfExecution;
    this.setAdditionalJsonLogicOperators();
  }
  /**
   *
   * @returns The next Question or `undefined` if there is none.
   */
  QuestionnaireEngine.prototype.nextQuestion = function () {
    var _this = this;
    var indexOfNextQuestion = this.questions.findIndex(function (
      question,
      index
    ) {
      var isAfterCurrentQuestion =
        index > _this.getQuestionIndex(_this.getCurrentQuestionId());
      var isEnabled = isQuestionEnabled(question, _this.data);
      return isAfterCurrentQuestion && isEnabled;
    });
    if (indexOfNextQuestion > -1) {
      return this.questions[indexOfNextQuestion];
    }
    return undefined;
  };
  QuestionnaireEngine.prototype.previousQuestion = function (
    currentQuestionId
  ) {
    var _a;
    this.removeAnswersStartingFrom(currentQuestionId);
    var previousAnswer = this.givenAnswers.pop();
    this.recreateDataObject();
    var previousQuestion =
      (_a = this.nextQuestion()) !== null && _a !== void 0
        ? _a
        : this.questions[0];
    if (
      previousQuestion.id ===
      (previousAnswer === null || previousAnswer === void 0
        ? void 0
        : previousAnswer.questionId)
    ) {
      return { question: previousQuestion, answer: previousAnswer.rawAnswer };
    }
    return { question: previousQuestion };
  };
  QuestionnaireEngine.prototype.getAnswersPersistence = function () {
    return { answers: this.givenAnswers, version: this.questionnaire.version };
  };
  QuestionnaireEngine.prototype.setAnswersPersistence = function (
    answersPersistence
  ) {
    this.givenAnswers = answersPersistence.answers;
    this.recreateDataObject();
  };
  QuestionnaireEngine.prototype.setAnswer = function (questionId, rawAnswer) {
    var question = this.getQuestionById(questionId);
    if (question === undefined) {
      throw new Error(
        'You cannot set the answer to a question that does not exist. QuestionId: ' +
          questionId
      );
    }
    if (!question.optional && rawAnswer === undefined) {
      throw new Error('This question is not optional: ' + questionId);
    }
    this.removeAnswersStartingFrom(questionId);
    this.givenAnswers.push({
      questionId: questionId,
      rawAnswer: rawAnswer,
    });
    this.recreateDataObject();
  };
  QuestionnaireEngine.prototype.removeAnswersStartingFrom = function (
    questionId
  ) {
    var indexOfAnswer = this.givenAnswers.findIndex(function (answer) {
      return answer.questionId === questionId;
    });
    if (indexOfAnswer > -1) {
      this.givenAnswers = this.givenAnswers.slice(0, indexOfAnswer);
    }
  };
  QuestionnaireEngine.prototype.getProgress = function () {
    var currentId = this.getCurrentQuestionId();
    if (currentId != undefined) {
      var nextQuestion = this.getNextQuestion(currentId);
      if (nextQuestion) {
        return (this.getQuestionIndex(currentId) + 1) / this.questions.length;
      } else {
        return 1;
      }
    }
    return 0;
  };
  QuestionnaireEngine.prototype.getNextQuestion = function (currentQuestionId) {
    var nextPossibleQuestion =
      this.questions[this.getQuestionIndex(currentQuestionId) + 1];
    if (nextPossibleQuestion != undefined) {
      if (isQuestionEnabled(nextPossibleQuestion, this.data)) {
        return nextPossibleQuestion;
      } else {
        return this.getNextQuestion(nextPossibleQuestion.id);
      }
    }
    return undefined;
  };
  QuestionnaireEngine.prototype.getQuestionIndex = function (questionId) {
    return this.questions.findIndex(function (_a) {
      var id = _a.id;
      return id === questionId;
    });
  };
  QuestionnaireEngine.prototype.getCurrentQuestionId = function () {
    var lastAnswer = this.givenAnswers[this.givenAnswers.length - 1];
    return lastAnswer === null || lastAnswer === void 0
      ? void 0
      : lastAnswer.questionId;
  };
  QuestionnaireEngine.prototype.processAnswerWithOptions = function (
    rawAnswer,
    question
  ) {
    var valueAsArray = primitive_1.convertToPrimitiveArray(rawAnswer);
    var count = question.options !== undefined ? question.options.length : 0;
    var selected_count = valueAsArray.length;
    var unselected_count = count - selected_count;
    var optionResponse = {};
    var score = {};
    for (var _i = 0, _a = question.options || []; _i < _a.length; _i++) {
      var option = _a[_i];
      var isSelected = valueAsArray.indexOf(option.value) > -1;
      optionResponse[option.value] = isSelected;
      if (isSelected) {
        score = this.mergeScores(score, option.scores);
      }
    }
    return {
      count: count,
      selected_count: selected_count,
      unselected_count: unselected_count,
      option: optionResponse,
      score: score,
    };
  };
  QuestionnaireEngine.prototype.mergeScores = function (scores1, scores2) {
    var combinedScores = scores1 !== null && scores1 !== void 0 ? scores1 : {};
    Object.entries(
      scores2 !== null && scores2 !== void 0 ? scores2 : {}
    ).forEach(function (_a) {
      var _b;
      var scoreId = _a[0],
        score = _a[1];
      combinedScores[scoreId] =
        ((_b = combinedScores[scoreId]) !== null && _b !== void 0 ? _b : 0) +
        score;
    });
    return combinedScores;
  };
  QuestionnaireEngine.prototype.getQuestionById = function (questionId) {
    return this.questions.find(function (question) {
      return question.id === questionId;
    });
  };
  QuestionnaireEngine.prototype.recreateDataObject = function () {
    var _this = this;
    var data = {};
    data['now'] = Math.round(this.timeOfExecution || Date.now() / 1000);
    var answersFromOptionQuestions = [];
    this.givenAnswers.forEach(function (_a) {
      var questionId = _a.questionId,
        rawAnswer = _a.rawAnswer;
      var question = _this.questions.find(function (_a) {
        var id = _a.id;
        return id === questionId;
      });
      if (
        (question === null || question === void 0 ? void 0 : question.type) ===
          'multiselect' ||
        (question === null || question === void 0 ? void 0 : question.type) ===
          'select'
      ) {
        var processedAnswer = _this.processAnswerWithOptions(
          rawAnswer,
          question
        );
        answersFromOptionQuestions.push(processedAnswer);
        data[questionId] = processedAnswer;
      } else {
        data[questionId] = rawAnswer;
      }
    });
    data.score = answersFromOptionQuestions.reduce(function (prev, curr) {
      return _this.mergeScores(prev, curr.score);
    }, {});
    this.data = this.calculateVariables(data);
  };
  QuestionnaireEngine.prototype.calculateVariables = function (data) {
    var lastData;
    var newData = __assign({}, data);
    var counter = 0;
    do {
      lastData = __assign({}, newData);
      this.variables.forEach(function (variable) {
        try {
          newData[variable.id] = jsonLogic.apply(variable.expression, newData);
        } catch (e) {}
      });
      counter = counter + 1;
    } while (
      !fast_deep_equal_1.default(lastData, newData) &&
      counter <= this.variables.length
    );
    return newData;
  };
  QuestionnaireEngine.prototype.getVariables = function () {
    var _this = this;
    this.recreateDataObject();
    return this.variables.reduce(function (aggregate, _a) {
      var id = _a.id;
      aggregate[id] = _this.data[id];
      return aggregate;
    }, {});
  };
  /**
   * SHOULD NOT BE USED
   * Exposes the Internal State for debugging purposes.
   * @returns Internal State
   */
  QuestionnaireEngine.prototype.getDataObjectForDeveloping = function () {
    return this.data;
  };
  QuestionnaireEngine.prototype.getCategoryResults = function () {
    this.recreateDataObject();
    var data = this.data;
    var results = this.resultCategories.map(function (resultCategory) {
      var resultInCategory = resultCategory.results.find(function (
        possibleResult
      ) {
        return jsonLogic.apply(possibleResult.expression, data);
      });
      if (resultInCategory !== undefined) {
        return {
          resultCategory: {
            id: resultCategory.id,
            description: resultCategory.description,
          },
          result: {
            id: resultInCategory.id,
            text: printf_1.default(resultInCategory.text, data),
          },
        };
      } else {
        return undefined;
      }
    });
    return results.filter(notUndefined);
  };
  QuestionnaireEngine.prototype.getResults = function () {
    var _this = this;
    return {
      answers: this.givenAnswers.reduce(function (aggregate, current) {
        aggregate[current.questionId] = current.rawAnswer;
        return aggregate;
      }, {}),
      exports: [
        // This is just for now, extra Exports should be implemented
        {
          id: 'covapp_qr',
          mapping: this.variables.reduce(function (aggregator, variable) {
            if (variable.id.startsWith('qr_')) {
              aggregator[variable.id.substring(3)] = jsonLogic.apply(
                variable.expression,
                _this.data
              );
            }
            return aggregator;
          }, {}),
        },
      ],
      questionnaireId: this.questionnaire.id,
      questionnaireVersion: this.questionnaire.version,
      results: this.getCategoryResults(),
    };
  };
  QuestionnaireEngine.prototype.setAdditionalJsonLogicOperators = function () {
    function convertToDateString(timestamp, dateFormat) {
      if (!timestamp || !dateFormat) {
        return null;
      }
      var timestampInMilliseconds = parseInt(timestamp.toString()) * 1000;
      return dayjs_1
        .default(timestampInMilliseconds)
        .format(dateFormat.toString());
    }
    jsonLogic.add_operation('convert_to_date_string', convertToDateString);
    jsonLogic.add_operation('round', Math.round);
    jsonLogic.add_operation('log10', Math.log10);
  };
  return QuestionnaireEngine;
})();
exports.QuestionnaireEngine = QuestionnaireEngine;
function notUndefined(x) {
  return x !== undefined;
}
function isQuestionEnabled(question, data) {
  return (
    question.enableWhenExpression === undefined ||
    jsonLogic.apply(question.enableWhenExpression, data)
  );
}
//# sourceMappingURL=questionnaireEngine.js.map

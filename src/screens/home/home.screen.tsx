/* eslint-disable react-native/no-inline-styles */
import { ApiResponse } from 'apisauce';
import React, { memo, useEffect, useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Button from 'src/components/Button/Button';
import { useAppDispatch, useAppSelector } from 'src/hooks/Hooks';
import { useNavigation } from '@react-navigation/native';
import { AppRoute } from 'src/navigator/app.route';
import CheckboxList from 'rn-checkbox-list';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import { counterSlice } from 'src/redux/counter/slice';
import api from 'src/services/apisauce';
import { LOCAL_STORAGE_KEYS } from 'src/utils/constants';
import { QuestionnaireEngine, RawAnswer } from 'src/utils/questionnaireEngine';
import { handleStorage } from 'src/utils/storage';
import { Question } from 'src/utils/type';
import { QUESTION_SHARE_DATA } from 'src/utils/utils';
import { getQuestionnaire } from './questions';

type Props = {
  navigation: any;
  route: {};
};

type A = {
  data: { email: string }[];
};

const HomeScreen: React.FC<Props> = memo(({ route }) => {
  const navigation = useNavigation();
  const navigateQuestionaire = () => {
    navigation.navigate(AppRoute.QUESTIONAIRE);
  };
  let questionnaireEngine: QuestionnaireEngine;

  const [answerData, setAnswerData] = useState<{
    [key: string]: any | undefined;
  }>({});

  const [currentQuestion, setCurrentQuestion] = useState<Question>();
  const [progress, setProgress] = useState<number>(0.01);

  useEffect(() => {
    newQuestionnaire();
  }, []);
  const persistStateToLocalStorage = () => {
    handleStorage.setItem(
      LOCAL_STORAGE_KEYS.ANSWERS,
      JSON.stringify(answerData)
    );
  };

  const currentAnswerValue = () => {
    if (currentQuestion === undefined) {
      return undefined;
    }
    return answerData[currentQuestion.id];
  };

  const moveToNextStep = () => {
    try {
      questionnaireEngine.setAnswer(currentQuestion.id, currentAnswerValue());
    } catch (error) {
      // this.showErrorBannerHandler();
      console.log(error);
      return;
    }
    const nextQuestion = questionnaireEngine.nextQuestion();
    setProgress(questionnaireEngine.getProgress());
    if (nextQuestion === undefined) {
      // let answers: any = questionnaireEngine.getAnswersPersistence();
      // if (
      //   answers.answers.find((q) => q.questionId === QUESTION_SHARE_DATA().id)
      //     .rawAnswer === 'yes'
      // ) {
      //   // User is sharing data
      //   donateAnswers(answers);
      // }
      // this.history.push(ROUTES.SUMMARY, {});
      // trackEvent(TRACKING_EVENTS.FINISH);
    } else {
      setCurrentQuestion(nextQuestion);
    }
    // this.persistStateToLocalStorage();

    // if (this.currentQuestion.id === QUESTION_SHARE_DATA().id) {
    //   trackEvent([
    //     ...TRACKING_EVENTS.DATA_DONATION_CONSENT,
    //     this.currentAnswerValue === 'yes' ? '1' : '0',
    //   ]);
    // }
    // try {
    //   window.scrollTo(0, 0);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const moveToPreviousStep = async () => {
    setProgress(questionnaireEngine.getProgress());
    if (progress === 0) {
      handleStorage.removeItem(LOCAL_STORAGE_KEYS.ANSWERS);
    } else {
      const { question, answer } = questionnaireEngine.previousQuestion(
        currentQuestion.id
      );
      setCurrentQuestion(question);
      const answers = JSON.parse(
        (await handleStorage.getItem(LOCAL_STORAGE_KEYS.ANSWERS)) ?? ''
      );
      if (answerData && answers) {
        setAnswerData(answers);
        persistStateToLocalStorage();
        // reset previous answer so that fields are still filled out
        // answerData needs reassignment to avoid race condition
        requestAnimationFrame(() =>
          setAnswerData({
            ...answerData,
            [currentQuestion.id]: answer as string[],
          })
        );
      }
    }
  };

  const newQuestionnaire = () => {
    getQuestionnaire('en')
      .then((questionnaire) => {
        questionnaireEngine = new QuestionnaireEngine(questionnaire);
        // TODO:https://github.com/CovOpen/CovQuestions/issues/148
        questionnaireEngine.setAnswersPersistence({
          answers: Object.keys(answerData).reduce((accumulator, key) => {
            accumulator.push({
              questionId: key,
              rawAnswer: answerData[key],
            });
            return accumulator;
          }, []),
          version: 2,
          timeOfExecution: 23,
        });
        // debugger;
        const previousQuestionId =
          currentQuestion === undefined ? undefined : currentQuestion.id;
        setCurrentQuestion(questionnaireEngine.nextQuestion());
        // Go back to previous Question if language is changed
        // TODO: https://github.com/CovOpen/CovQuestions/issues/190
        if (
          previousQuestionId !== undefined &&
          currentQuestion.id !== previousQuestionId
        ) {
          setCurrentQuestion(
            questionnaireEngine.previousQuestion(currentQuestion.id).question
          );
        }
        setProgress(questionnaireEngine.getProgress());
      })
      .catch(() => {
        // do nothing for now
      });
  };

  console.log('Tube currentQuestion:', currentQuestion);

  return (
    <SafeAreaView style={styles.container}>
      <Button
        onPress={navigateQuestionaire}
        title="Start"
        style={{
          marginHorizontal: 20,
          marginBottom: 50,
        }}></Button>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
  },
});

export default HomeScreen;

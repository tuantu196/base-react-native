/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import { ApiResponse } from 'apisauce';
import React, { memo, useEffect, useState } from 'react';
import {
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
import { Option, Question } from 'src/utils/type';
import { QUESTION_SHARE_DATA } from 'src/utils/utils';
import { getQuestionnaire } from './questions';
import InputComponent from './components/input';
import TextRegular from 'src/components/TextRegular';
import Space from 'src/components/Space';
import DatePickerComponent from './components/datepicker';
import CheckBoxListComponent from './components/check.box.list';
import { colors } from 'src/utils/colors';
import { CheckBox } from 'react-native-elements';
import TextInput from 'src/components/TextInput';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import HeaderComponents from './components/header';

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
  var questionnaireEngine: QuestionnaireEngine;

  const [answerData, setAnswerData] = useState<{
    [key: string]: any | undefined;
  }>({});
  const [currentQuestion, setCurrentQuestion] = useState<Question>();
  const [progress, setProgress] = useState<number>(0.01);
  const [date, setDate] = useState(new Date());
  const [textAnswer, setTextAnswer] = useState('');
  const [show, setShow] = useState(false);
  const onChangeDate = (selectedDate: any) => {
    setShow(false);
    setDate(selectedDate);
  };
  const onOpenDatePicker = () => {
    setShow(true);
  };
  useEffect(() => {
    newQuestionnaire();
  }, [answerData]);
  const newQuestionnaire = async () => {
    await getQuestionnaire('en')
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
          currentQuestion?.id !== previousQuestionId
        ) {
          setCurrentQuestion(
            questionnaireEngine.previousQuestion(currentQuestion?.id as string)
              .question
          );
        }
        setProgress(questionnaireEngine.getProgress());
        console.log('question1111', questionnaireEngine);
      })
      .catch(() => {
        // do nothing for now
      });
    console.log('question22222222', questionnaireEngine);
  };
  const persistStateToLocalStorage = () => {
    handleStorage.setItem(
      LOCAL_STORAGE_KEYS.ANSWERS,
      JSON.stringify(answerData)
    );
  };

  const updateFormData = (event: any) => {
    const { detail } = event;
    if (currentQuestion?.type === 'date') {
      // Calculate Custom Timestamp
      // TODO: https://github.com/CovOpen/CovQuestions/issues/143
      event.value = event.value / 1000;
    }
    setTextAnswer('');
    setFormData(currentQuestion?.id as string, event.value);
  };
  const setFormData = (key: string, value: string | string[]) => {
    // eslint-disable-next-line no-const-assign
    let temp;
    temp = {
      ...answerData,
      [key]: value,
    };
    console.log('temp', temp);

    setAnswerData(temp);
    console.log('data', answerData);
  };
  const submitForm = () => {
    // (event.target as HTMLInputElement).querySelector('input')?.focus();
    switch (currentQuestion?.type) {
      case 'select': {
        const answer = currentQuestion.options?.find(
          (option: Option) => option?.checked === true
        ) as Option;
        console.log('answer', answer);

        setFormData(currentQuestion?.id as string, answer?.value);
        break;
      }
      case 'multiselect': {
        console.log('answers', currentQuestion);
        const answers = currentQuestion?.options?.map((option: Option) => {
          if (option?.checked) {
            return option?.value;
          }
        }) as unknown as string[];
        console.log('answers', answers);

        if (answers?.length) {
          setFormData(currentQuestion?.id as string, answers);
        }
        break;
      }
      case 'date': {
        updateFormData(date);
        break;
      }
      case 'number': {
        updateFormData(textAnswer);
        break;
      }
      case 'text': {
        updateFormData(textAnswer);
        break;
      }
    }
    // updateFormData();
    moveToNextStep();
  };

  const moveToPreviousStep = async () => {
    setProgress(questionnaireEngine.getProgress());
    if (progress === 0) {
      handleStorage.removeItem(LOCAL_STORAGE_KEYS.ANSWERS);
    } else {
      const { question, answer } = questionnaireEngine.previousQuestion(
        currentQuestion?.id as string
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
            [currentQuestion?.id]: answer as string[],
          })
        );
      }
    }
  };
  const currentAnswerValue = (): RawAnswer => {
    if (currentQuestion === undefined) {
      return undefined;
    }
    return answerData[currentQuestion.id];
  };

  const moveToNextStep = () => {
    try {
      questionnaireEngine?.setAnswer(
        currentQuestion?.id as string,
        currentAnswerValue()
      );
    } catch (error) {
      // this.showErrorBannerHandler();
      console.log(error);
      return;
    }
    const nextQuestion = questionnaireEngine?.nextQuestion();
    setProgress(questionnaireEngine?.getProgress());
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
    console.log('question', currentQuestion);
    console.log('aaaaaa', questionnaireEngine);
  };
  console.log('Tube currentQuestion:', currentQuestion);

  const onChecked = (item: any, options: any[], isSelected: boolean) => {
    const _options = options.map((option: any) => {
      return {
        ...option,
        checked:
          item.value === option.value
            ? !option?.checked
            : isSelected
            ? false
            : option?.checked || false,
      };
    });
    const _question = { ...currentQuestion, options: _options } as Question;
    setCurrentQuestion(_question);
  };

  const renderAnswer = () => {
    switch (currentQuestion?.type) {
      case 'select': {
        return (
          <CheckBoxListComponent
            options={currentQuestion?.options as any[]}
            onChecked={onChecked}
            isSelected={true}
          />
        );
      }
      case 'date':
        return (
          <View style={styles.page}>
            <View style={styles.scheduleView}>
              <TextInput
                value={moment(date).format('DD/MM/YYYY')}
                placeholder={'DD/MM/YYYY'}
                onTouchStart={onOpenDatePicker}
                editable={false}
                // style={styles.datePicker}
              />
              <DatePicker
                modal
                mode="date"
                open={show}
                date={date}
                onConfirm={(date: any) => onChangeDate(date)}
                onCancel={() => {
                  setShow(false);
                }}
              />
            </View>
          </View>
        );
      case 'multiselect':
        return (
          <CheckBoxListComponent
            options={currentQuestion?.options as any[]}
            onChecked={onChecked}
            isSelected={false}
          />
        );
      case 'number':
        return (
          <View style={styles.inputView}>
            <TextInput
              placeholder={'Your answer'}
              value={textAnswer}
              onChangeText={setTextAnswer}
              keyboardType={'numeric'}
            />
          </View>
        );
      case 'text':
        return (
          <View style={styles.inputView}>
            <TextInput
              placeholder={'Your answer'}
              value={textAnswer}
              onChangeText={setTextAnswer}
            />
          </View>
        );
      default:
        return (
          <View style={{ flex: 1 }}>
            <TextRegular>{currentQuestion?.text}</TextRegular>
          </View>
        );
    }
  };

  const onPrev = () => {};
  return (
    <View style={styles.container}>
      <HeaderComponents
        question={currentQuestion?.text as string}
        onPress={onPrev}
      />
      {renderAnswer()}
      <Button
        onPress={() => {
          submitForm();
        }}
        title="Next"
        disabled={
          !currentQuestion?.optional && currentAnswerValue === undefined
        }
        style={{
          marginHorizontal: 20,
          marginBottom: 50,
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  scheduleView: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 20,
    padding: 25,
    backgroundColor: '#fff',
  },
  inputView: {
    borderWidth: 1,
    borderColor: colors.light_gray,
    borderRadius: 20,
    padding: 25,
    backgroundColor: '#fff',
  },
});

export default HomeScreen;

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
import { handleObjectStorage, handleStorage } from 'src/utils/storage';
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
import { RouterHistory } from 'src/utils/typeRouteHistory';
import { json } from 'stream/consumers';
import CheckBoxListMultipleComponent from './components/check.box.list.multiple';
import Descriptions from './components/description';

type Props = {
  navigation: any;
  route: {};
};

type A = {
  data: { email: string }[];
};

const HomeScreen: React.FC<Props> = memo(({ route }) => {
  const navigation = useNavigation();
  let questionnaireEngine: QuestionnaireEngine;
  const [answerData, setAnswerData] = useState<{
    [key: string]: any | undefined;
  }>({});
  const [questionData, setQuestionData] = useState<QuestionnaireEngine>();
  const [currentQuestion, setCurrentQuestion] = useState<Question>();
  const [progress, setProgress] = useState<number>(0.01);
  const [date, setDate] = useState(new Date());
  const [textAnswer, setTextAnswer] = useState('');
  const [show, setShow] = useState(false);
  const [disable, setDisable] = useState(true);
  const onChangeDate = (selectedDate: any) => {
    setShow(false);
    setDate(selectedDate);
    setDisable(false);
  };
  const onOpenDatePicker = () => {
    setShow(true);
  };
  const onChangeTextAnswer = (text: any) => {
    setDisable(false);
    setTextAnswer(text);
  };
  const newQuestionnaire = () => {
    getQuestionnaire('en')
      .then((questionnaire) => {
        questionnaireEngine = new QuestionnaireEngine(questionnaire);
        setQuestionData(questionnaireEngine);
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
        previousQuestionId();
        // setProgress(questionnaireEngine.getProgress());
      })
      .catch(() => {
        // do nothing for now
      });
  };
  const previousQuestionId = () => {
    // currentQuestion === undefined ? undefined : currentQuestion.id;
    setCurrentQuestion(questionnaireEngine.nextQuestion());
  };

  const persistStateToLocalStorage = () => {
    handleStorage.setItem(
      LOCAL_STORAGE_KEYS.ANSWERS,
      JSON.stringify(answerData)
    );
  };
  const setFormData = (key: string, value: string | string[]) => {
    let temp;
    temp = {
      ...answerData,
      [key]: value,
    };
    setAnswerData(temp);

    persistStateToLocalStorage();
  };

  const submitForm = () => {
    switch (currentQuestion?.type) {
      case 'select': {
        const answer = currentQuestion.options?.find(
          (option: Option) => option?.checked === true
        ) as Option;

        setFormData(currentQuestion?.id as string, answer?.value);
        break;
      }
      case 'multiselect': {
        const answers = currentQuestion?.options?.map((option: Option) => {
          if (option?.checked) {
            return option?.value;
          }
        }) as unknown as string[];

        if (answers?.length) {
          setFormData(currentQuestion?.id as string, answers);
        }
        break;
      }
      case 'date': {
        setFormData(currentQuestion?.id as string, date.toString());
        break;
      }
      case 'number': {
        setFormData(currentQuestion?.id as string, textAnswer);
        break;
      }
      case 'text': {
        setFormData(currentQuestion?.id as string, textAnswer);
        break;
      }
    }
    // moveToNextStep();
  };
  // const moveToNextStep = () => {
  //   // setCurrentQuestion(currentQuestion);
  //   // const question = questionData?.nextQuestion();
  //   console.log('current answer', currentAnswerValue());

  //   try {
  //     questionData?.setAnswer(
  //       currentQuestion?.id as string,
  //       currentAnswerValue()
  //     );
  //   } catch (error) {
  //     // this.showErrorBannerHandler();
  //     console.log(error);
  //     return;
  //   }
  //   setCurrentQuestion(questionData?.nextQuestion());
  // };
  // const currentAnswerValue = (): RawAnswer => {
  //   if (currentQuestion === undefined) {
  //     return undefined;
  //   }
  //   return answerData[currentQuestion?.id];
  // };

  const onChecked = async (item: any, options: any[], isSelected: boolean) => {
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

    const _question = {
      ...currentQuestion,
      options: _options,
    } as Question;
    setCurrentQuestion(_question);
    setDisable(false);
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
          <CheckBoxListMultipleComponent
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
              onChangeText={(text) => {
                onChangeTextAnswer(text);
              }}
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
              onChangeText={(text) => {
                onChangeTextAnswer(text);
              }}
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

  const moveToPreviousStep = async () => {
    if (progress === 0) {
      handleStorage.removeItem(LOCAL_STORAGE_KEYS.ANSWERS);
    } else {
      const { question, answer }: any = questionData?.previousQuestion(
        currentQuestion?.id as string
      );
      switch (question?.type) {
        case 'select': {
          const _options = question.options.map((option: Option) => {
            return {
              ...option,
              checked: option.value === answer,
            };
          });
          const _question = {
            ...question,
            options: _options,
          };
          setCurrentQuestion(_question);
          break;
        }
        case 'text': {
          setTextAnswer(answer);
          setCurrentQuestion(question);
          break;
        }
        case 'number': {
          setTextAnswer(answer);
          setCurrentQuestion(question);
          break;
        }
        case 'date': {
          setDate(new Date(answer));
          setCurrentQuestion(question);
          break;
        }
        case 'multiselect': {
          const _options = question.options.map((option: Option) => {
            return {
              ...option,
              checked: answer.find((a: string) => a === option.value),
            };
          });
          const _question = {
            ...question,
            options: _options,
          };
          setCurrentQuestion(_question);
          break;
        }
      }
      // getDataQuestion();
      persistStateToLocalStorage();
    }
  };
  // console.log('current data', answerData);

  useEffect(() => {
    const getData = async () => {
      const availableAnswers = await handleStorage.getItem(
        LOCAL_STORAGE_KEYS.ANSWERS
      );
      if (answerData) {
        setAnswerData(JSON.parse(availableAnswers));
      } else {
        return;
      }
    };
    getData();
  }, []);

  useEffect(() => {
    newQuestionnaire();
    setDisable(true);
  }, [answerData]);
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 20 }}>
        <HeaderComponents
          question={currentQuestion?.text as string}
          onPress={moveToPreviousStep}
        />
        <Space size={20} />
        <Descriptions
          description={currentQuestion?.text as string}
          onPress={moveToPreviousStep}
        />
      </View>

      {renderAnswer()}
      <Button
        onPress={() => {
          submitForm();
        }}
        title="Next"
        disabled={disable}
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
    marginHorizontal: 20,
  },
});

export default HomeScreen;

/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */

import { useNavigation } from '@react-navigation/native';
import { t } from 'i18next';
import React, { memo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
// import StepIndicator from 'react-native-step-indicator';
import Swiper from 'react-native-swiper';
import Button from 'src/components/Button/Button';
import Space from 'src/components/Space';
import TextRegular from 'src/components/TextRegular';
import { colors } from 'src/utils/colors';
import TextBold from '../../components/TextBold';

const QUESTION = [
  {
    q: 'How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?',
    d: '',
    a: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very Often'],
    c: null,
  },
  {
    q: 'How often do you have difficulty getting things in order when you have to do a task that requires organization?',
    d: '',
    a: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very Often'],
    c: null,
  },
  {
    q: 'How often do you have problems remembering appointments or obligations?',
    d: '',
    a: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very Often'],
    c: null,
  },
  {
    q: 'How often do you make careless mistakes when you have to work on a boring or difficult project?',
    d: '',
    a: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very Often'],
    c: null,
  },
  {
    q: 'How often do you have difficulty keeping your attention when you are doing boring or repetitive work?',
    d: '',
    a: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very Often'],
    c: null,
  },
  {
    q: 'How often do you have difficulty concentrating on what people say to you, even when they are speaking to you directly?',
    d: '',
    a: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very Often'],
    c: null,
  },
  {
    q: 'How often do you misplace or have difficulty finding things at home or at work?',
    d: '',
    a: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very Often'],
    c: null,
  },
  {
    q: 'How often are you distracted by activity or noise around you?',
    d: '',
    a: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very Often'],
    c: null,
  },
  {
    q: 'How often do you feel restless or fidgety?',
    d: '',
    a: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very Often'],
    c: null,
  },
];
const Questionaire = memo(() => {
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const navigation = useNavigation();
  const [question, setQuestion] = useState(QUESTION);

  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: colors.primaryColor,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: colors.primaryColor,
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: colors.primaryColor,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: colors.primaryColor,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: colors.primaryColor,
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: colors.primaryColor,
  };

  const onStepPress = (position: number) => {
    setCurrentPage(position);
  };

  const renderViewPagerPage = (data: any, index: number) => {
    const renderItem = (item: any, i: any) => {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: colors.light_gray,
            borderWidth: 1,
            marginBottom: 10,
            borderRadius: 20,
            backgroundColor: colors.white,
            paddingVertical: 5,
          }}>
          <CheckBox
            checked={question[index].c === i}
            checkedColor={colors.primaryColor}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            size={30}
            onPress={() => {
              const temp = [...question];
              temp[index].c = i;
              setQuestion(temp);
            }}
          />
          <TextRegular>{item}</TextRegular>
        </View>
      );
    };
    return (
      <View key={data} style={styles.page}>
        <View
          style={{
            flex: 1,
            width: '100%',
          }}>
          <Space size={20} />
          <TextRegular size={20}>{data.q}</TextRegular>
          <Space />
          <TextBold size={30}>{data.d}</TextBold>
          <Space />
          <FlatList
            data={data.a}
            renderItem={({ item, index }) => renderItem(item, index)}
            style={{
              width: '100%',
            }}
            scrollEnabled={false}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          {index === 0 ? (
            <View />
          ) : (
            <Button
              title="Back"
              style={{ flex: 1, backgroundColor: colors.gray }}
              onPress={() => {
                setCurrentPage(currentPage - 1);
              }}
            />
          )}
          <Space horizontal />
          {index === 8 ? (
            <Button
              title={'Continue'}
              style={{ flex: 1 }}
              onPress={() => {
                // navigation.navigate(AppRoute.RESULT);
              }}
            />
          ) : (
            <Button
              title={'Continue'}
              style={{ flex: 1 }}
              onPress={() => {
                setCurrentPage(currentPage + 1);
              }}
            />
          )}
        </View>
        <Space size={20} />
      </View>
    );
  };

  return (
    <View
      style={{ flexDirection: 'column', flex: 1, backgroundColor: '#FAFAFA' }}>
      {/* <BackButton /> */}
      <Space size={20} />

      <Swiper
        showsPagination={false}
        style={{ flexGrow: 1 }}
        loop={false}
        index={currentPage}
        autoplay={false}
        scrollEnabled={false}
        onIndexChanged={(page) => {
          setCurrentPage(page);
        }}>
        {question.map((page, index) => renderViewPagerPage(page, index))}
      </Swiper>
    </View>
  );
});

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
});
export default Questionaire;

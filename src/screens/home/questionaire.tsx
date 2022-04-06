/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */

import React, { memo, useState } from 'react';
import { FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import Button from 'src/components/Button/Button';
import Space from 'src/components/Space';
import TextInput from 'src/components/TextInput';
import TextRegular from 'src/components/TextRegular';
import { colors } from 'src/utils/colors';
import TextBold from '../../components/TextBold';
import DatePickerComponent from './components/datepicker';
import CheckboxList from 'rn-checkbox-list';
// import CheckboxGroup from 'react-native-checkbox-group';
const QUESTION = [
  {
    q: 'How often do you feel restless or fidgety?',
    d: '',
    a: ['Yes', 'No'],
    c: null,
  },
  {
    q: 'How often do you have problems remembering appointments or obligations?',
    d: '',
    a: ['DD/MM/YYYY'],
    c: null,
  },
  {
    q: 'How often do you make careless mistakes when you have to work on a boring or difficult project?',
    d: '',
    a: ['Input'],
    c: null,
  },
  {
    q: 'How often do you have difficulty keeping your attention when you are doing boring or repetitive work?',
    d: '',
    a: ['Yes', 'No'],
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
    a: ['Input'],
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
    a: ['Yes', 'No'],
    c: null,
  },
];
const Questionaire = memo(() => {
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [question, setQuestion] = useState(QUESTION);
  const [date, setDate] = useState(new Date());
  const [check, setCheck] = useState<any>([]);
  const onChange = (checkedValues: any) => {
    console.log('checked = ', checkedValues);
  };

  const renderViewPagerPage = (data: any, index: number) => {
    const renderItem = (item: any, i: any) => {
      return (
        <View style={{ flex: 1 }}>
          {(() => {
            switch (item) {
              case 'Input':
                return (
                  <View style={styles.inputView}>
                    <TextInput placeholder={'Your answer'}></TextInput>
                  </View>
                );
              case 'DD/MM/YYYY':
                return <DatePickerComponent />;
              default:
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
            }
          })()}
        </View>
      );
    };
    return (
      <View key={data} style={styles.page}>
        <Space size={20} />
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
  scheduleView: {
    borderWidth: 1,
    borderColor: colors.light_gray,
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
export default Questionaire;

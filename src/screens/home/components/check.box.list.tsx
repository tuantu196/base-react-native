import React, { useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TextInput from 'src/components/TextInput';
import moment from 'moment';
import { colors } from 'src/utils/colors';
import DatePicker from 'react-native-date-picker';
import CheckboxList from 'rn-checkbox-list';

const data = [
  { id: 1, name: 'Green Book' },
  { id: 2, name: 'Bohemian Rhapsody' },
  { id: 3, name: 'Roma' },
  { id: 4, name: 'Black Panther' },
  { id: 5, name: 'The Favourite' },
];
const CheckBoxListComponent = () => {
  return (
    <View style={styles.scheduleView}>
      <CheckboxList
        theme={'red'}
        listItems={data}
        // onChange={({ ids, items }) => {
        //   // eslint-disable-next-line no-console
        //   console.log('My updated list :: ', ids);
        // }}
        checkboxProp={Platform.select({
          ios: {
            boxType: 'square',
            tintColor: 'gray',
            onTintColor: 'red',
            onCheckColor: '#fff',
            onFillColor: 'red',
          },
          android: {
            tintColors: {
              true: 'red',
              false: 'gray',
            },
          },
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scheduleView: {
    borderWidth: 1,
    borderColor: colors.light_gray,
    borderRadius: 20,
    padding: 25,
    backgroundColor: '#fff',
  },
});

export default CheckBoxListComponent;

import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TextInput from 'src/components/TextInput';
import moment from 'moment';
import { colors } from 'src/utils/colors';
import DatePicker from 'react-native-date-picker';


const InputComponent = () => {
  return (
    <View style={styles.inputView}>
      <TextInput placeholder={'Your answer'} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    borderWidth: 1,
    borderColor: colors.light_gray,
    borderRadius: 20,
    padding: 25,
    backgroundColor: '#fff',
  },
});

export default InputComponent;

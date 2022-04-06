/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TextInput from 'src/components/TextInput';
import moment from 'moment';
import { colors } from 'src/utils/colors';
import DatePicker from 'react-native-date-picker';

const DatePickerComponent = (updateFormData: any) => {
  const navigation = useNavigation();

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const onChangeDate = (selectedDate: any) => {
    setShow(false);
    setDate(selectedDate);
    updateFormData(selectedDate);
  };
  const onOpenDatePicker = () => {
    setShow(true);
  };
  return (
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

export default DatePickerComponent;

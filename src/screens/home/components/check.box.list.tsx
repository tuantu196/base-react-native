import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { colors } from 'src/utils/colors';

export interface Props {
  options: any[];
  isSelected: boolean;
  onChecked: (option: any, options: any[], isSelected: boolean) => void;
}
const CheckBoxListComponent = ({ isSelected, options, onChecked }: Props) => {
  const data = options.map((option: any) => {
    return {
      ...option,
      checked: option.checked || false,
    };
  });

  return (
    <View>
      {data.map((option: any, index: number) => {
        return (
          <CheckBox
            key={index}
            checkedColor={colors.primaryColor}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            size={30}
            containerStyle={styles.itemCheck}
            checked={option.checked}
            title={option.text}
            onPress={() => {
              // updateFormData(item);
              onChecked(option, options, isSelected);
            }}
          />
        );
      })}
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
  itemCheck: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.light_gray,
    height: 60,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: colors.white,
    paddingVertical: 5,
  },
});

export default CheckBoxListComponent;

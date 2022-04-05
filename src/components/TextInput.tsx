import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import _ from 'lodash';
export interface TextInputProps extends RNTextInputProps {
  validateReg?: RegExp;
}
const TextInput = ({
  value,
  style,
  validateReg,
  onChangeText,
  ...props
}: TextInputProps) => {
  const textInputRef = useRef<RNTextInput>();
  const [_value, setValue] = useState(value);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const _onChangeText2 = useCallback(
    _.debounce((text) => onChangeText && onChangeText(text), 300),
    [onChangeText]
  );
  useEffect(() => {
    setValue(value);
  }, [value]);
  const _onChangeText = useCallback(
    (text) => {
      if (text && validateReg && !validateReg.test(text)) {
        let _text = text
          .split('')
          .map((t: string) => {
            return validateReg.test(t) ? t : '';
          })
          .join('');
        setValue(_text);
        _onChangeText2(_text);
      } else {
        setValue(text);
        _onChangeText2(text);
      }
    },
    [_onChangeText2, validateReg]
  );
  // console.log('TextInput', _value);
  return (
    <RNTextInput
      //@ts-ignore
      ref={textInputRef}
      {...props}
      style={[styles.default, style]}
      value={_value}
      onChangeText={_onChangeText}
    />
  );
};
export default TextInput;
const styles = StyleSheet.create({
  default: { paddingVertical: 0, paddingHorizontal: 0 },
});

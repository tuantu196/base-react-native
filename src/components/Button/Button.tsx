import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { colors } from 'src/utils/colors';

const Button: React.FC<
  TouchableOpacityProps & { title?: string; textStyle?: StyleProp<TextStyle> }
> = ({ title, style, textStyle, disabled, children, ...props }) => {
  return (
    <TouchableOpacity
      style={[styles.container, disabled ? styles.disabledButton : {}, style]}
      {...props}
      {...{ disabled }}>
      {title ? (
        <Text
          style={[styles.text, disabled ? styles.disabledText : {}, textStyle]}>
          {title}
        </Text>
      ) : null}
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  disabledText: { color: '#fff' },
  disabledButton: { backgroundColor: '#E0E0E0' },
  text: { color: '#fff', fontSize: 17 },
  container: {
    borderRadius: 100,
    height: 55,
    flexDirection: 'row',
    backgroundColor: colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Button;

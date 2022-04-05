import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

const TextRegular: React.FC<TextProps & { size?: number; color?: string }> = ({
  style,
  size,
  color,
  ...props
}) => {
  return (
    <Text style={[styles.title, { fontSize: size, color }, style]} {...props} />
  );
};
export default TextRegular;

const styles = StyleSheet.create({
  title: { color: '#fff' },
});

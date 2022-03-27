import { TFunctionResult } from 'i18next';
import React, { memo } from 'react';
import { Text, TextProps } from 'react-native';

export interface AppTextProps extends TextProps {
  value?: string | number | null | TFunctionResult;
  fontSize?: number;
  color?: string;
  fontFamily?: string;
}

const AppText = memo(
  ({
    children,
    color,
    value,
    fontFamily,
    fontSize,
    ...props
  }: AppTextProps) => {
    return <Text {...props}>{value ? value : children}</Text>;
  }
);

export default AppText;

import React from 'react';
import { View } from 'react-native';

const Space = ({
  size = 10,
  horizontal,
}: {
  size?: number;
  horizontal?: boolean;
}) => {
  const style = horizontal ? { width: size } : { height: size };
  return <View style={style} />;
};

export default Space;

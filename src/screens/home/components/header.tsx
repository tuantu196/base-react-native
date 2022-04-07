import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import TextRegular from 'src/components/TextRegular';

export interface Props {
  question: string;
  onPress: () => void;
}

export const HeaderComponents = ({ question, onPress }: Props) => {
  return (
    <View style={styles.container}>
      <Icon
        name={'chevron-left'}
        size={30}
        tvParallaxProperties={undefined}
        onPress={onPress}
      />
      <Text style={styles.text}>{question}</Text>
    </View>
  );
};

export default HeaderComponents;

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 20,
  },
});

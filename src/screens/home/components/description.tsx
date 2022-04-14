import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import TextRegular from 'src/components/TextRegular';

export interface Props {
  description: string;
  onPress: () => void;
}

export const Descriptions = ({ description, onPress }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{description}</Text>
    </View>
  );
};

export default Descriptions;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 50,
  },
  text: {
    fontSize: 16,
    color: 'gray',
  },
});

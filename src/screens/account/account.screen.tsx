import React, { memo } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { counterSlice, incrementByAmount } from 'src/redux/counter/slice';

type Props = {
  navigation: any;
  route: {};
};

const AccountScreen: React.FC<Props> = memo(({ navigation, route }) => {
  const counter = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const doDecrement = () => {
    dispatch(counterSlice.actions.decrement());
  };
  const doAmountDecrement = () => {
    dispatch(incrementByAmount(10));
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <Text>{counter}</Text>
        </View>
        <Button onPress={doDecrement} title="Decrement"></Button>
        <Button
          onPress={doAmountDecrement}
          title="Increment By Amount"></Button>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
  },
});

export default AccountScreen;

import { ApiResponse } from 'apisauce';
import React, { memo, useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { counterSlice } from 'src/redux/counter/slice';
import api from 'src/services/apisauce';

type Props = {
  navigation: any;
  route: {};
};

type A = {
  data: { email: string }[];
};

const HomeScreen: React.FC<Props> = memo(({ navigation, route }) => {
  const counter = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const [a, setA] = useState<any>();

  const doIncrement = () => {
    dispatch(counterSlice.actions.increment());
  };

  useEffect(() => {
    async function av() {
      const response: ApiResponse<A> = await api.get('/users?page=2');
      console.log('Tube response:', response);
      setA(response.data?.data[0].email);
    }
    av();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>{a}</Text>
        {/* <Text>{a}</Text> */}
      </View>
      <Button onPress={doIncrement} title="Increase"></Button>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});

export default HomeScreen;

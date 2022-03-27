import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from 'src/screens/home/home.screen';
import { AppRoute } from './app.route';

export type HomeStackParamList = {
  [AppRoute.HOME]: undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();

const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={AppRoute.HOME} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;

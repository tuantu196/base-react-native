import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from 'src/screens/home/home.screen';
import Questionaire from 'src/screens/home/questionaire';
import { AppRoute } from './app.route';

export type HomeStackParamList = {
  [AppRoute.HOME]: undefined;
  [AppRoute.QUESTIONAIRE]: undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();

const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={AppRoute.HOME} component={HomeScreen} />
      <Stack.Screen name={AppRoute.QUESTIONAIRE} component={Questionaire} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;

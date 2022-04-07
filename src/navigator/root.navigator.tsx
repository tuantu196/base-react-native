import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from 'src/screens/home/home.screen';
import { AppNavigator } from './app.navigator';
import { AppRoute } from './app.route';
import { AuthNavigator } from './auth.navigator';

export type RootStackParamList = {
  [AppRoute.APP]: undefined;
  [AppRoute.AUTH]: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

type RootStackNavigatorProps = React.ComponentProps<typeof Stack.Navigator>;

export const RootNavigator = (
  props: Partial<RootStackNavigatorProps>
): React.ReactElement => {
  return (
    <Stack.Navigator
      {...props}
      screenOptions={{ headerShown: false }}
      initialRouteName={AppRoute.APP}>
      <Stack.Screen name={AppRoute.APP} component={HomeScreen} />
      <Stack.Screen name={AppRoute.AUTH} component={AuthNavigator} />
    </Stack.Navigator>
  );
};

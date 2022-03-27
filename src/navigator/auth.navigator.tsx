import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from 'src/screens/auth/login.screen';
import { AppRoute } from './app.route';

export type AuthStackParamList = {
  [AppRoute.LOGIN]: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AppRoute.LOGIN}
        options={{
          headerShown: false,
        }}
        component={LoginScreen}
      />
    </Stack.Navigator>
  );
};

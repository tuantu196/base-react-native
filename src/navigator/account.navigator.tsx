import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AccountScreen from 'src/screens/account/account.screen';
import { AppRoute } from './app.route';

export type AccountStackParamList = {
  [AppRoute.ACCOUNT]: undefined;
};

const Stack = createStackNavigator<AccountStackParamList>();

const AccountNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={AppRoute.ACCOUNT} component={AccountScreen} />
    </Stack.Navigator>
  );
};

export default AccountNavigator;

import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import PaymentScreen from 'src/screens/payment/payment.screen';
import { AppRoute } from './app.route';

export type PaymentStackParamList = {
  [AppRoute.PAYMENT]: undefined;
};

const Stack = createStackNavigator<PaymentStackParamList>();

const PaymentNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={AppRoute.PAYMENT} component={PaymentScreen} />
    </Stack.Navigator>
  );
};

export default PaymentNavigator;

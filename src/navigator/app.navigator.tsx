import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import AccountNavigator from './account.navigator';
import { AppRoute } from './app.route';
import HomeNavigator from './home.navigator';

export type AppTabParamList = {
  [AppRoute.HOME_NAVIGATOR]: undefined;
  [AppRoute.ACTIVITIES]: undefined;
  [AppRoute.PAYMENT]: undefined;
  [AppRoute.ACCOUNT_NAVIGATOR]: { test: string } | undefined;
};

const Tab = createMaterialBottomTabNavigator<AppTabParamList>();

export const AppNavigator = ({}) => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={AppRoute.HOME_NAVIGATOR}
        component={HomeNavigator}
        options={{ title: 'Home' }}
      />
      {/* <Tab.Screen name={AppRoute.ACTIVITIES} component={ActivityScreen} />
      <Tab.Screen name={AppRoute.PAYMENT} component={PaymentScreen} /> */}
      <Tab.Screen
        name={AppRoute.ACCOUNT_NAVIGATOR}
        component={AccountNavigator}
        options={{ title: 'Account' }}
      />
    </Tab.Navigator>
  );
};

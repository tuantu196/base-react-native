import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ActivityScreen from 'src/screens/activity/activity.screen';
import { AppRoute } from './app.route';

export type ActivityStackParamList = {
  [AppRoute.ACTIVITIES]: undefined;
};

const Stack = createStackNavigator<ActivityStackParamList>();

const ActivityNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={AppRoute.ACTIVITIES} component={ActivityScreen} />
    </Stack.Navigator>
  );
};

export default ActivityNavigator;

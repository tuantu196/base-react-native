/* eslint-disable react-native/no-inline-styles */
import { ApiResponse } from 'apisauce';
import React, { memo, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Button from 'src/components/Button/Button';
import { useAppDispatch, useAppSelector } from 'src/hooks/Hooks';
import { useNavigation } from '@react-navigation/native';
import { AppRoute } from 'src/navigator/app.route';

type Props = {
  navigation: any;
  route: {};
};

type A = {
  data: { email: string }[];
};

const HomeScreen: React.FC<Props> = memo(() => {
  const navigation = useNavigation();
  const navigateQuestionaire = () => {
    navigation.navigate(AppRoute.QUESTIONAIRE);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Button
        onPress={navigateQuestionaire}
        title="Start"
        style={{
          marginHorizontal: 20,
        }}></Button>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
  },
});

export default HomeScreen;

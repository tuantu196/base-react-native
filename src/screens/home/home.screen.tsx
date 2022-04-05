/* eslint-disable react-native/no-inline-styles */
import { ApiResponse } from 'apisauce';
import React, { memo, useEffect, useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Button from 'src/components/Button/Button';
import { useAppDispatch, useAppSelector } from 'src/hooks/Hooks';
import { useNavigation } from '@react-navigation/native';
import { AppRoute } from 'src/navigator/app.route';
import CheckboxList from 'rn-checkbox-list';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';

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
          marginBottom: 50,
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

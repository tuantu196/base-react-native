import { SafeAreaView, StyleSheet, View } from 'react-native';
import { colors } from 'utils/colors';
import React from 'react';

const SettingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default SettingScreen;

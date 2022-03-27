import React, { memo } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { colors } from 'src/utils/colors';

type Props = {
  navigation: any;
  route: {};
};

const PaymentScreen: React.FC<Props> = memo(({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View></View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default PaymentScreen;

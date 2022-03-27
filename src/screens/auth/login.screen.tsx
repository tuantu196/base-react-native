import React, { memo } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { colors } from 'src/utils/colors';

type Props = {
  navigation: any;
  route: {};
};

const LoginScreen: React.FC<Props> = memo(({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view}>
        <Text>ddfdfdfd</Text>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  view: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default LoginScreen;

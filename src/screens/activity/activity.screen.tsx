import React, { memo } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

type Props = {
  navigation: any;
  route: {};
};

const ActivityScreen: React.FC<Props> = memo(({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>dfdfd</Text>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
});

export default ActivityScreen;

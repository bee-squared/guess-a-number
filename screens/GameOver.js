import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GameOver = (props) => {
  <View style={styles.screen}>
    <Text>The Game is Over!</Text>
  </View>
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default GameOver;
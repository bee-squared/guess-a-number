import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Nice Job!</Text>
      <Text style={styles.text}>The Game is Over</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    display: 'flex',
    alignSelf: 'center',
    width: '80%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
  }
});

export default GameOverScreen;
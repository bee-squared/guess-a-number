import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Colors from '../constants/colors';

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Nice Job!</Text>
      <Text style={styles.text}>The Game is Over</Text>
      <View style={styles.statsContainer}>
        <Text style={styles.stats}>Number of rounds: {props.roundsNumber}</Text>
        <Text style={styles.stats}>Number was: {props.userNumber}</Text>
      </View>
      <Button title="New Game" color={Colors.accent} onPress={props.onRestart} />
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
  },
  statsContainer: {
    marginVertical: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stats: {
    fontSize: 18,
    color: Colors.primary,
  }
});

export default GameOverScreen;
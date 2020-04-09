import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Stylesheet, StyleSheet, Button, Alert } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import Colors from '../constants/colors';
import DefaultStyles from '../constants/default-styles';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude)
  } else {
    return rndNum;
  }
}

const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, props.userChoice)
  );
  const [rounds, setRounds] = useState(0);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.onGameOver(rounds);
    }
  }, [currentGuess, userChoice, onGameOver])

  const nextGuessHandler = (direction) => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert('Whoops!', 'Actually, that\'s not correct', [{ text: 'My bad', style: 'cancel' }
      ]);
      return;
    }

    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    setRounds((curRounds) => curRounds + 1)
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.guess}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View style={styles.divider}></View>
      <Card style={styles.buttonContainer}>
        <Button title='-' color={Colors.accent} onPress={() => nextGuessHandler('lower')} />
        <Button title='+' color={Colors.accent} onPress={() => nextGuessHandler('greater')} />
      </Card>
    </View>
  )

}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
    width: 300,
    maxWidth: '80%',
    height: 100,
  },
  guess: {
    fontSize: 22,
    marginTop: 30,
    marginBottom: 30,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: 'black',
    height: 1,
    flexDirection: 'row',
    width: '90%',
  }
})

export default GameScreen;
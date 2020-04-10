import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Stylesheet, StyleSheet, Alert, ScrollView } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import Colors from '../constants/colors';
import DefaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';
import {Ionicons} from '@expo/vector-icons';

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

const renderListItem = (value, numOfRound) => (
  <View key={value} style={styles.listItem}>
    <Text style={DefaultStyles.bodyText}>#{numOfRound}</Text>
    <Text>{value}</Text>
  </View>
)

const GameScreen = (props) => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.onGameOver(pastGuesses.length);
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
      currentLow.current = currentGuess + 1; // added 1 to ensure guess key is unique for guess list
    }
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    // setRounds((curRounds) => curRounds + 1)
    setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses])
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.guess}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View style={styles.divider}></View>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={() => nextGuessHandler('lower')} textStyle={styles.guess}><Ionicons name={'md-remove'} size={24} color={'white'}/></MainButton>
        <MainButton onPress={() => nextGuessHandler('greater')} textStyle={styles.guess}><Ionicons name={'md-add'} size={24} color={'white'}/></MainButton>
      </Card>
      <View style={styles.list}>
        <ScrollView>
          {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
        </ScrollView>
      </View>
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
    marginVertical: 20,
    width: 300,
    maxWidth: '90%',
    height: 100,
  },
  guess: {
    marginTop: 30,
    marginBottom: 30,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: 'black',
    height: 1,
    flexDirection: 'row',
    width: '80%',
  },
  list: {
    width: '80%'
  },
  listItem: {
    flexDirection: 'row',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    justifyContent: 'space-around',
  }
})

export default GameScreen;
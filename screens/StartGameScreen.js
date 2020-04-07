import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';

const StartGameScreen = (props) => {

  const [enteredValue, setEnteredValue] = useState('');

  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g), '')
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Start a New Game!</Text>
      <Card style={styles.inputContainer}>
        <Text style={styles.instruction}>Select a Number</Text>
        <Input
          style={styles.input}
          blurOnSubmit
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='numeric'
          maxLength={ 2}
          value={enteredValue}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title='Reset' color={Colors.accent} onPress={() => {}} />
          </View>
          <View style={styles.button}>
            <Button title='Confirm' color={Colors.primary} onPress={() => {}} />
          </View>
        </View>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    // flex: 1, // takes all the space it can get, both vertically and horizontally
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: 'black',
    padding: 30,
    fontSize: 25,
  },
  instruction: {
    color: 'black',
    marginBottom: 20,
    fontSize: 20,
  },
  inputContainer: {
    justifyContent: 'center',
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: "space-between",
    paddingHorizontal: 20,
    height: 50,
  },
  button: {
    width: 100,
  },
  input: {
    width: 50,
    textAlign: 'center',
  }
});

export default StartGameScreen;
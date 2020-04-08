import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';

const StartGameScreen = (props) => {

  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  }

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid Number!', 'The number has to be a number between 1 and 99.',
        [{text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
      )
      return;
    }

    setConfirmed(true);
    setSelectedNumber(chosenNumber)
    setEnteredValue('');
    Keyboard.dismiss();
  }

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer} >
          <Text style={styles.instruction}>You selected</Text>
          <NumberContainer>{selectedNumber}</NumberContainer>
          <Button color={Colors.accent} title="START GAME" onPress={() => props.onStartGame(selectedNumber)}/>
      </Card>
    )
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      // dismisses keyboard when user clicks somewhere else on screen
      Keyboard.dismiss();
    }}>
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
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title='Reset'
                onPress={resetInputHandler}
                color={Colors.primary}
              />
            </View>
            <View style={styles.button}>
              <Button
                title='Confirm'
                onPress={confirmInputHandler}
                color={Colors.accent} />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: 'black',
    padding: 30,
    fontSize: 25,
    fontFamily: 'open-sans-bold',
  },
  instruction: {
    color: 'black',
    marginBottom: 10,
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 50,
  },
  button: {
    width: 100,
  },
  input: {
    width: 50,
    textAlign: 'center',
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
    width: 300,
    maxWidth: '80%',
    height: 200,
  },
});

export default StartGameScreen;
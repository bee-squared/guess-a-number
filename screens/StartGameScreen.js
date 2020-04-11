import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';

import Colors from '../constants/colors';
import DefaultStyles from '../constants/default-styles';


const StartGameScreen = (props) => {

  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4)

  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  }

  useState((useEffect) => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 4)
    }

    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout)
    }
  })

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
          <Text style={{...DefaultStyles.title, ...styles.instruction}}>You selected</Text>
          <NumberContainer>{selectedNumber}</NumberContainer>
          <MainButton onPress={() => {props.onStartGame(selectedNumber)}}>Start Game</MainButton>
      </Card>
    )
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset='30'>
        <TouchableWithoutFeedback onPress={() => {
          // dismisses keyboard when user clicks somewhere else on screen
          Keyboard.dismiss();
        }}>
          <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game!</Text>
            <Card style={styles.inputContainer}>
              <Text style={{...DefaultStyles.BodyText, ...styles.instruction}}>Select a Number</Text>
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
                <View style={{width: buttonWidth}}>
                  <Button
                    title='Reset'
                    onPress={resetInputHandler}
                    color={Colors.primary}
                  />
                </View>
                <View style={{width: buttonWidth}}>
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
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Dimensions.get('window').height > 600 ? 30 : 10,
  },
  title: {
    color: 'black',
    padding: Dimensions.get('window').height > 600 ? 10 : 5,
    fontSize: Dimensions.get('window').height > 600 ? 25 : 15,
    fontFamily: 'open-sans-bold',
    marginBottom: 10,
  },
  instruction: {
    marginBottom: 10,
    fontSize: Dimensions.get('window').height > 600 ? 20 : 16,
    fontFamily: 'open-sans',
  },
  inputContainer: {
    justifyContent: 'center',
    width: Dimensions.get('window').height > 600 ? '80%' : '20%',
    maxWidth: '95%',
    minWidth: Dimensions.get('window').height > 600 ? '80%' : '70%',
    alignItems: 'center',
    height: Dimensions.get('window').height > 600 ? 210 : 180,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 38,
  },
  // button: {
  //   width: Dimensions.get('window').height > 600 ? '45%' : '42%',
  //   // width: Dimensions.get('window').width / 5,
  // },
  input: {
    width: 50,
    textAlign: 'center',
    fontSize: Dimensions.get('window').height > 600 ? 28 : 20,
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
    width: 280,
    maxWidth: '80%',
    height: Dimensions.get('window').height > 600 ? 220 : 180,
  },
});

export default StartGameScreen;
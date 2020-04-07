import React from 'react';
import { View, Text, TextInput, StyleSheet, Button, ShadowPropTypesIOS } from 'react-native';

const StartGameScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Start a New Game!</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.instruction}>Select a Number</Text>
        <TextInput style={styles.input}/>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title='Reset' onPress={() => {}} />
          </View>
          <View style={styles.button}>
            <Button title='Confirm' onPress={() => {}} />
          </View>
        </View>
      </View>
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
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.26,
    backgroundColor: 'white',
    height: 240,
    elevation: 4,
    padding: 20,
    borderRadius: 10,
  },
  input: {
    width: '90%',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 18,
    marginBottom: 20,
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
  }
});

export default StartGameScreen;
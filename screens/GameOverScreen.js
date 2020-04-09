import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

import MainButton from '../components/MainButton';

import Colors from '../constants/colors';
import DefaultStyles from '../constants/default-styles';

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={{...DefaultStyles.title, ...styles.text, marginTop: 60}}>Nice Job!</Text>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          fadeDuration={500}
          source={require('../assets/images/success.png')}
          // network image option
          // source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQg2xR-iMflkjg9gDmuZPFeCW9G_qd6EAniNlVDFRwz1z6WpEdJ&usqp=CAU'}}
          // resizeMode={'cover'}
        />
      </View>
      <Text style={{...DefaultStyles.title, ...styles.text}}>The Game is Over</Text>
      <View style={styles.statsContainer}>
        <Text style={{...DefaultStyles.bodyText, ...styles.stats}}>Your device needed <Text style={DefaultStyles.textHighlight}>{props.roundsNumber}</Text> rounds to guess the number <Text style={DefaultStyles.textHighlight}>{props.userNumber}</Text></Text>

      </View>
      <MainButton onPress={props.onRestart}>New Game</MainButton>
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
    color: 'black',
    textAlign: 'center',
  },
  imageContainer: {
    borderRadius: 150,
    borderWidth: 2,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 20,
    width: 300,
    height: 300,
  },
  image: {
    height: '100%',
    width: '100%',
  },
});

export default GameOverScreen;
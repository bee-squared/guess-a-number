import React from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView } from 'react-native';

import MainButton from '../components/MainButton';

import Colors from '../constants/colors';
import DefaultStyles from '../constants/default-styles';

const GameOverScreen = (props) => {
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.screen}>
        <Text style={{...DefaultStyles.title, ...styles.text, marginTop: 60 }}>Nice Job!</Text>
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
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    display: 'flex',
    alignSelf: 'center',
    width: '80%',
    height: Dimensions.get('window').height > 600 ? '80%' : '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
  },
  statsContainer: {
    marginVertical: Dimensions.get('window').height > 600 ? 25 : 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stats: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    marginVertical: 10,
  },
  imageContainer: {
    width: Dimensions.get('window').height > 500 ? Dimensions.get('window').width * 0.7 : Dimensions.get('window').width * 0.45,
    height: Dimensions.get('window').height > 500 ? Dimensions.get('window').width * 0.7 : Dimensions.get('window').width * 0.45,
    borderRadius: Dimensions.get('window').height > 500 ? Dimensions.get('window').width * 0.7 / 2 : Dimensions.get('window').width * 0.45 / 2,
    borderWidth: 2,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height > 600 ? Dimensions.get('window').height / 45 : Dimensions.get('window').height / 60,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  scroll: {
    justifyContent: 'center',
  }
});

export default GameOverScreen;
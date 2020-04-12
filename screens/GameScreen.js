import React, { useState, useRef, useEffect } from 'react';
import { View,
  Text,
  Stylesheet,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList,
  Dimensions,
 } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import Colors from '../constants/colors';
import DefaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';
import { Ionicons } from '@expo/vector-icons';
import { ScreenOrientation } from 'expo';

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

const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <Text style={DefaultStyles.bodyText}>#{listLength - itemData.index}</Text>
    <Text>{itemData.item}</Text>
  </View>
)

const GameScreen = (props) => {
  // Lock the layout orientation for the user once it is set during app load
  // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width)
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height)
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get('window').width);
      setAvailableDeviceHeight(Dimensions.get('window').height);
    }
    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    }
  })

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
    setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses])
  };

  if (availableDeviceWidth > 500) {
    styles.listContainer = styles.listContainerSmall;
  }

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text style={styles.guess}>Opponent's Guess</Text>
        <View style={styles.controls}>
          <MainButton onPress={() => nextGuessHandler('lower')} textStyle={styles.guess}>
            <Ionicons name={'md-remove'} size={24} color={'white'}/>
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton onPress={() => nextGuessHandler('greater')} textStyle={styles.guess}>
            <Ionicons name={'md-add'} size={24} color={'white'}/>
          </MainButton>
        </View>
        <View style={styles.listContainer}>
          {// scrollView instead of flatlist is below}
          /* <ScrollView contentContainerStyle={styles.list}>
            {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
          </ScrollView> */}
          <FlatList
            keyExtractor={(item) => item}
            data={pastGuesses}
            renderItem={(itemData) => renderListItem(pastGuesses.length, itemData)}
            contentContainerStyle={styles.list}
            // another option
            //renderItem={renderListItem.bind(this, pastGuesses.length)}
          />
      </View>
    </View>
    )
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.guess}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View style={styles.divider}></View>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={() => nextGuessHandler('lower')} textStyle={styles.guess}><Ionicons name={'md-remove'} size={24} color={'white'}/></MainButton>
        <MainButton onPress={() => nextGuessHandler('greater')} textStyle={styles.guess}><Ionicons name={'md-add'} size={24} color={'white'}/></MainButton>
      </Card>
      <View style={styles.listContainer}>
        {// scrollView instead of flatlist is below}
        /* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
        </ScrollView> */}
        <FlatList
          keyExtractor={(item) => item}
          data={pastGuesses}
          renderItem={(itemData) => renderListItem(pastGuesses.length, itemData)}
          contentContainerStyle={styles.list}
          // another option
          //renderItem={renderListItem.bind(this, pastGuesses.length)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
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
    marginTop: Dimensions.get('window').height / 20 > 600 ? 20 : 5,
    marginBottom: Dimensions.get('window').height / 20 > 600 ? 30 : 10,
    fontSize: Dimensions.get('window').height > 600 ? 25 : 15,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: 'black',
    height: 1,
    flexDirection: 'row',
    width: '80%',
    marginVertical: Dimensions.get('window').height / 20 > 600 ? 20 : 5,
  },
  listContainer: {
    flex: 1,
    width: '60%',
    marginBottom: 30,
  },
  listContainerSmall: {
    flex: 1,
    width: '60%',
    marginBottom: 15,
  },
  list: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  listItem: {
    flexDirection: 'row',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: Dimensions.get('window').height / 20 > 600 ? 15 : 5,
    marginVertical: Dimensions.get('window').height / 20 > 600 ? 10 : 5,
    backgroundColor: 'white',
    justifyContent: 'space-around',
    width: '100%',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
  }
})

export default GameScreen;
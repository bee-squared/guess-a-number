import { StyleSheet } from 'react-native';
import Colors from './colors';

export default StyleSheet.create({
  bodyText: {
    fontFamily: 'open-sans',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 55,
  },
  textHighlight: {
    fontFamily: 'open-sans-bold',
    color: Colors.accent,
    fontSize: 22,
  }
})
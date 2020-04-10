import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

import Colors from '../constants/colors';

const MainButton = (props) => {
  return <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
    <View style={{...styles.button}}>
      <Text style={styles.buttonText}>{props.children}</Text>
    </View>
  </TouchableOpacity>
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.accent,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'open-sans-bold',
    // fontSize: Dimensions.get('window').height > 600 ? 18 : 112,
  },
});

export default MainButton;
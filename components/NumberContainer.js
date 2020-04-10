import React from 'react';
import { View, Text, StyleSheet, Dimensions, } from 'react-native';
import Colors from '../constants/colors'

const NumberContainer = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{props.children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.accent,
    padding: Dimensions.get('window').height > 600 ? 10 : 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  number: {
    color: Colors.primary,
    fontSize: Dimensions.get('window').height > 600 ? 22 : 18,
  }
});

export default NumberContainer;
import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import Colors from '../constants/colors';

const Header = (props) => {
  return (
    <View
      style={{
        ...styles.headerBase,
        ...Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid,
        })
      }}
    >
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerBase: {
    width: '100%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  headerIOS: {
    paddingTop: 30,
    borderBottomColor: '#ccc',
    borderBottomWidth: 5,
  },
  headerAndroid: {
    paddingTop: 10,
    backgroundColor: Colors.primary,
    borderBottomColor:'transparent',
    borderBottomWidth: 0,
  },
  headerTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'open-sans-bold',
  }
});

export default Header;
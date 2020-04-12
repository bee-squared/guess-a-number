import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import Colors from '../constants/colors';

const Header = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 80,
    paddingTop: Dimensions.get('window').height > 600 ? 30 : 10,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: Platform.OS === 'ios' ? '#ccc' : 'transparent',
    borderBottomWidth: Platform.OS === 'ios' ? 5 : 0,
  },
  headerTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'open-sans-bold',
  }
});

export default Header;
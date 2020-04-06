import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%';
    height: 90;
    paddingTop: 36;
    backgroundColor: '#336699';
    alignItems: center;
  },
  headerTitle: {

  }
});

export default Header;
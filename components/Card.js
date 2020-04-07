import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
  return <View style={{...styles.card, ..props.style}}>{props.children}</View>
}

const styles = StyleSheet({
  card: {
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
  }
});

export default Card;
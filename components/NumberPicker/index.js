import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
} from 'react-native';
import styles from './styles';

const NumberPicker = (props) => {
  const {
    label = null,
    textColor = 'black',
    isGrown,
    number=0,
    orange=false,
    percent=false,
  } = props;
  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={() => isGrown(-1)} underlayColor={"white"}>
        <Text style={styles.plusAndMinus}>-</Text>
      </TouchableHighlight>
      <View style={styles.roundedGrey}>
        <Text style={{color: orange && 'orange'}}>{number} {percent && '%'}</Text>
      </View>
      <TouchableHighlight onPress={() => isGrown(1)} underlayColor={"white"}>
        <Text style={styles.plusAndMinus}>+</Text>
      </TouchableHighlight>
    </View>
  );
};

export default NumberPicker;

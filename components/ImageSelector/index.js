import React from 'react';
import {
  TouchableHighlight,
  Image,
} from 'react-native';
import styles from './styles';

const ImageSelector = props => {
  const { file, onPress, isRed } = props;
  if (file && file.uri) {
    return (
      <TouchableHighlight onPress={onPress} underlayColor={'white'}>
        <Image
          source={{ uri: (file.uri) }}
          style={styles.image}
        />
      </TouchableHighlight>
    );
  }
  return (
    <TouchableHighlight onPress={onPress} underlayColor={'white'} style={[styles.touch, { borderWidth: isRed ? 1 : 0 }]}>
      <Image
        source={require('../../assets/images/upload.png')}
        style={styles.image}
      /></TouchableHighlight>
  );

};

export default ImageSelector;


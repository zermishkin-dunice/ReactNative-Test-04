import { Dimensions, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundedGrey: {
    borderRadius: 5,
    backgroundColor: '#DCDCDC',
    width: 40,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusAndMinus: {
    marginHorizontal: 10,
  }
});


export default styles;

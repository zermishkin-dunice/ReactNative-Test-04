import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: RFValue(40),
  },
  textInput: {
    marginVertical: 50,
    height: 40,
    borderColor: 'grey',
    borderBottomWidth: 0.5,
    width: '100%',
    textAlign: 'center',
  },
  inlineView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    borderRadius: 5,
    borderColor: 'red',
    alignItems: 'center',
  },
  descriptionBox: {
    marginVertical: 50,
    width: '100%',
    borderColor: 'red',
    borderRadius: 5,
  },
  descriptionFieldView: {
    borderRadius: 5,
    backgroundColor: '#DCDCDC',
    padding: RFValue(10),
    height: 100,
  },
  InitialPriceFieldView: {
    borderRadius: 5,
    backgroundColor: '#DCDCDC',
    padding: RFValue(3),
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
  },
  thirdPart: {
    flex: 1,
  },
  greenBtn: {

    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  autocompletesContainer: {
    paddingTop: 0,
    zIndex: 1,
    width: "100%",
    paddingHorizontal: 8,
  },
  inputDropdown: {
    maxHeight: 40,
  },
  autocompleteContainer: {
    backgroundColor: '#ffffff',
    borderColor: 'red',
    width: '100%'
  },
  btnModal: {
    width: '100%',
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 0.5,
    alignItems: 'center',
    marginVertical: 5,
    paddingVertical: 5,
  },
  fullWidth: {
    width: '100%',
  },
});


export default styles;

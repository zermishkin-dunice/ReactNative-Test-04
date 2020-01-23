import { combineReducers } from 'redux';
import form, { initialFormState } from './form';
import dictionary, { initialDicState } from './dictionary';

export const initialState = {
  form: initialFormState,
  dictionary: initialDicState,
};

export default combineReducers({
  form,
  dictionary,
});

import { createReducer } from 'redux-create-reducer';
import * as actions from '../actionTypes';

export const initialFormState = {
  title: '',
  category: null,
  name: '',
  quantity: 0,
  availabilityStart: null,
  availabilityEnd: null,
  isAuth: false,
  image: null,
  description: '',
  price: 0,
  discount: 0,
  errors: [],
  loading: false,
};
const handleChangeForm = (state, { name, value }) => ({ ...state, [name]: value });
const settingTitle = (state, {data}) => ({ ...state, title: data});

const actionHandlers = {
  [actions.HANDLE_CHANGE_FORM]: handleChangeForm,
  [actions.SET_TITLE]: settingTitle,
};

export default createReducer(initialFormState, actionHandlers);

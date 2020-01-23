import { createReducer } from 'redux-create-reducer';
import * as actions from '../actionTypes';

export const initialDicState = {
  categories: [],
  loading: true,
};


const setCategories = (state, { data }) => ({ loading: false, categories: data });

const actionHandlers = {
  [actions.GET_CATEGORIES_SUCCESS]: setCategories,
};

export default createReducer(initialDicState, actionHandlers);

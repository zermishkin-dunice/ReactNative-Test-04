import { takeEvery } from 'redux-saga/effects';
import * as actions from '../../actionTypes';
import getCategories from './getCategories';

export default function* sagaGetDictionary() {
  yield takeEvery(actions.GET_CATEGORIES, getCategories);
}

import { takeEvery } from 'redux-saga/effects';
import * as actions from '../../actionTypes';
import submitForm from './submitForm';

export default function* sagaGetDictionary() {
  yield takeEvery(actions.SUBMIT_FORM, submitForm);
}

import { fork } from 'redux-saga/effects';
import form from './form';
import dictionary from './dictionary';

export default function* rootSaga() {
  yield fork(form);
  yield fork(dictionary);
}

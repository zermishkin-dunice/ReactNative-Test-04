import { put, call } from 'redux-saga/effects';
import ajax from '../../services/ajax.service';
import { SERVER_ADDRESS } from '../../../constants';
import { getCategoriesSuccess } from '../../actionCreators';
import mockCategories from '../../mockData/categories';

export default function* getCategories() {
  try {
    const currentCategories = yield call(ajax, {
      method: 'get',
      path: '/categories',
      mockResult: mockCategories,
    });
    yield put(getCategoriesSuccess(currentCategories));
  } catch (error) {
    console.log('ERROR');
  }
}

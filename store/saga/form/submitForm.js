import {
  put,
  call,
  select,
} from 'redux-saga/effects';
import ajax from '../../services/ajax.service';
import constants from '../../../constants';

const { SERVER_ADDRESS } = constants;

export default function* submit() {
  const title = yield select(store => store.form.title);
  const category = yield select(store => store.form.category.id);
  const name = yield select(store => store.form.name);
  const quantity = yield select(store => store.form.quantity);
  const availability_end = yield select(store => store.form.availabilityEtart);
  const availability_start = yield select(store => store.form.availabilityStart);
  const image = yield select(store => store.form.image);
  const description = yield select(store => store.form.description);
  const price = yield select(store => store.form.price);
  const discount = yield select(store => store.form.discount/100);
  const data = {
    title,
    category,
    name,
    quantity,
    availability_end,
    availability_start,
    image,
    description,
    price,
    discount,
  };
  try {
    const result = yield call(ajax, {
      method: 'post',
      path: '/products/new',
      data,
      mockResult: () => alert('all is ok'),
    });
    result();
  } catch (error) {
    console.log('ERROR');
  }
}

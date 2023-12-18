import { call, put, takeLatest } from 'redux-saga/effects';
import toast from 'react-hot-toast';

import { resetPasswordApi } from '@domain/api';

import { setLoading } from '@containers/App/actions';
import { RESET_PASSWORD } from './constants';

export function* doResetPassword({ token, data, cbSuccess }) {
  yield setLoading(true);
  try {
    const response = yield call(resetPasswordApi, token, data);
    console.log(response);
    toast.success('Please Login');
    cbSuccess && cbSuccess();
  } catch (error) {
    toast.error('Reset password Error', error.message);
  }
  yield setLoading(false);
}

export default function* resetPasswordSaga() {
  yield takeLatest(RESET_PASSWORD, doResetPassword);
}

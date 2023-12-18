import { call, put, takeLatest } from 'redux-saga/effects';
import toast from 'react-hot-toast';

import { createForgotPasswordApi } from '@domain/api';

import { setLoading } from '@containers/App/actions';
import { FORGOT_PASSWORD } from './constants';

export function* doForgotPassword({ email }) {
  yield setLoading(true);
  try {
    yield call(createForgotPasswordApi, email);
    toast.success('Please Check your email');
  } catch (error) {
    toast.error('Forgot password Error', error.message);
  }
  yield setLoading(false);
}

export default function* forgotPasswordSaga() {
  yield takeLatest(FORGOT_PASSWORD, doForgotPassword);
}

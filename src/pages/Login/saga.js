import { call, put, takeLatest } from 'redux-saga/effects';
import toast from 'react-hot-toast';

import { loginApi } from '@domain/api';

import { USER_LOGIN } from '@pages/Login/constants';

import { setLogin, setToken } from '@containers/Client/actions';
import { setLoading } from '@containers/App/actions';

export function* doLoginUser({ data }) {
  yield setLoading(true);
  try {
    const response = yield call(loginApi, data);
    if (response.status !== 200) {
      return toast.error('Something went wrong');
    }
    yield put(setToken(response?.data?.token));
    yield put(setLogin(true));
  } catch (error) {
    toast.error('Login Error', error.message);
  }
  yield setLoading(false);
}

export default function* loginUserSaga() {
  yield takeLatest(USER_LOGIN, doLoginUser);
}

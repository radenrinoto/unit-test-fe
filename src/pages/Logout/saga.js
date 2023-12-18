import { call, put, takeLatest } from 'redux-saga/effects';
import toast from 'react-hot-toast';

import { logoutApi } from '@domain/api';

import { USER_LOGOUT } from '@pages/Logout/constants';

import { setLogin, setToken } from '@containers/Client/actions';
import { setLoading } from '@containers/App/actions';

export function* doLogoutUser() {
  yield setLoading(true);
  try {
    yield call(logoutApi);
    yield put(setToken(null));
    yield put(setLogin(false));
    toast.success('Success Logout');
  } catch (error) {
    toast.error('LogoutError Error', error.message);
  }
  yield setLoading(false);
}

export default function* logoutUserSaga() {
  yield takeLatest(USER_LOGOUT, doLogoutUser);
}

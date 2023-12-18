import { takeLatest, call, put } from 'redux-saga/effects';

import toast from 'react-hot-toast';
import { registerApi } from '@domain/api';
import { showPopup, setLoading } from '@containers/App/actions';
import { successCreateUser } from './actions';
import { REGISTER_USER } from './constants';

function* doCreateUser({ user }) {
  yield put(setLoading(true));
  try {
    const response = yield call(registerApi, user);
    if (response) {
      yield put(successCreateUser());
      toast.success('Create Employee successfully');
    }
  } catch (error) {
    yield put(showPopup());
  }
  yield put(setLoading(false));
}

export default function* createUserSaga() {
  yield takeLatest(REGISTER_USER, doCreateUser);
}

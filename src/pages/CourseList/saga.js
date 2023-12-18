import { takeLatest, call, put } from 'redux-saga/effects';

import { getMyCourseApi } from '@domain/api';
import { showPopup, setLoading } from '@containers/App/actions';
import { GET_MY_COURSE } from './constants';
import { setMyCourse } from './actions';

function* doGetMyCourse() {
  yield put(setLoading(true));
  try {
    const response = yield call(getMyCourseApi);
    yield put(setMyCourse(response.data));
  } catch (error) {
    yield put(showPopup());
  }
  yield put(setLoading(false));
}

export default function* myCourseSaga() {
  yield takeLatest(GET_MY_COURSE, doGetMyCourse);
}

import { takeLatest, call, put } from 'redux-saga/effects';

import { getCourseCategoriesApi, getCoursesApi } from '@domain/api';
import { showPopup, setLoading } from '@containers/App/actions';
import { GET_CATEGORIES, GET_COURSES } from './constants';
import { setCategories, setCourses } from './actions';

function* doGetCourses() {
  yield put(setLoading(true));
  try {
    const response = yield call(getCoursesApi);
    yield put(setCourses(response?.data));
  } catch (error) {
    yield put(showPopup());
  }
  yield put(setLoading(false));
}

function* doGetCategories() {
  yield put(setLoading(true));
  try {
    const response = yield call(getCourseCategoriesApi);
    yield put(setCategories(response.data));
  } catch (error) {
    yield put(showPopup());
  }
  yield put(setLoading(false));
}

export default function* courseSaga() {
  yield takeLatest(GET_COURSES, doGetCourses);
  yield takeLatest(GET_CATEGORIES, doGetCategories);
}

import { takeLatest, call, put } from 'redux-saga/effects';
import toast from 'react-hot-toast';

import {
  createCourseApi,
  deleteCourseApi,
  getInstructorsApi,
  updateCourseApi,
  updateCourseImageApi,
} from '@domain/api';
import { showPopup, setLoading } from '@containers/App/actions';
import { ADD_COURSE, DELETE_COURSE, GET_INSTRUCTOR, UPDATE_COURSE, UPDATE_COURSE_IMAGE } from './constants';
import { setInstructors } from './actions';

function* doUpdateCourse({ id, data, cbSuccess }) {
  yield put(setLoading(true));
  try {
    const response = yield call(updateCourseApi, id, data);
    if (response?.status === 200) {
      cbSuccess && cbSuccess();
      toast.success('Success Update Course');
    }
  } catch (error) {
    yield put(showPopup());
  }
  yield put(setLoading(false));
}

function* doDeleteCourse({ id, cbSuccess }) {
  yield put(setLoading(true));
  try {
    yield call(deleteCourseApi, id);
    cbSuccess && cbSuccess();
    toast.success('Success Delete Course');
  } catch (error) {
    yield put(showPopup());
  }
  yield put(setLoading(false));
}

function* doAddCourse({ data, cbSuccess }) {
  yield put(setLoading(true));
  try {
    const response = yield call(createCourseApi, data);
    if (response?.status === 201) {
      cbSuccess && cbSuccess();
      toast.success('Success Delete Course');
    }
  } catch (error) {
    yield put(showPopup());
  }
  yield put(setLoading(false));
}

function* doGetInstructors() {
  yield put(setLoading(true));
  try {
    const response = yield call(getInstructorsApi);
    yield put(setInstructors(response.data));
  } catch (error) {
    yield put(showPopup());
  }
  yield put(setLoading(false));
}

function* doUpdateCourseImage({ id, data, cbSuccess }) {
  yield put(setLoading(true));
  try {
    const response = yield call(updateCourseImageApi, id, data);
    if (response.status === 201) {
      cbSuccess && cbSuccess();
    }
    toast.success('Success Update Image Course');
  } catch (error) {
    yield put(showPopup());
  }
  yield put(setLoading(false));
}

export default function* adminCourseSaga() {
  yield takeLatest(UPDATE_COURSE, doUpdateCourse);
  yield takeLatest(UPDATE_COURSE_IMAGE, doUpdateCourseImage);
  yield takeLatest(GET_INSTRUCTOR, doGetInstructors);
  yield takeLatest(DELETE_COURSE, doDeleteCourse);
  yield takeLatest(ADD_COURSE, doAddCourse);
}

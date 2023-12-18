import { takeLatest, call, put } from 'redux-saga/effects';

import toast from 'react-hot-toast';
import { getCourseApi, createTransactionApi, updateStatusTransactionApi, createParticipantsApi } from '@domain/api';
import { showPopup, setLoading } from '@containers/App/actions';
import { GET_COURSE, CREATE_TRANSACTION, CREATE_PARTICIPANT, UPDATE_STATUS_TRANSACTION } from './constants';
import { setCourse, setTransaction } from './actions';

function* doGetCourses({ id }) {
  yield put(setLoading(true));
  try {
    const response = yield call(getCourseApi, id);
    yield put(setCourse(response.data));
  } catch (error) {
    yield put(showPopup());
  }
  yield put(setLoading(false));
}

function* doCreateParticipant({ courseId }) {
  yield put(setLoading(true));
  try {
    yield call(createParticipantsApi, courseId);
  } catch (error) {
    yield put(showPopup());
  }
  yield put(setLoading(false));
}

function* doUpdateStatusTransaction({ orderId, token, cbSuccess }) {
  yield put(setLoading(true));
  try {
    const response = yield call(updateStatusTransactionApi, token, orderId);
    if (response?.data?.status === 'settlement') {
      cbSuccess && cbSuccess();
    }
  } catch (error) {
    yield put(showPopup());
  }
  yield put(setLoading(false));
}

function* doCreateTransaction({ data, cbSuccess }) {
  yield setLoading(true);
  try {
    const { courseId } = data;
    const response = yield call(createTransactionApi, courseId);
    yield put(setTransaction(response?.data?.payment?.token));
    window.snap.pay(response?.data?.payment?.token, {
      onSuccess: (result) => {
        cbSuccess && cbSuccess(result?.order_id, response?.data?.payment?.token);
      },
      onPending: () => {
        toast.error('wating your payment!');
      },
    });
  } catch (error) {
    toast.error('Create Transaction Error', error.message);
  }
  yield setLoading(false);
}

export default function* coursesSaga() {
  yield takeLatest(GET_COURSE, doGetCourses);
  yield takeLatest(CREATE_TRANSACTION, doCreateTransaction);
  yield takeLatest(CREATE_PARTICIPANT, doCreateParticipant);
  yield takeLatest(UPDATE_STATUS_TRANSACTION, doUpdateStatusTransaction);
}

import {
  GET_COURSE,
  SET_COURSE,
  CREATE_TRANSACTION,
  SET_TRANSACTION,
  CREATE_PARTICIPANT,
  UPDATE_STATUS_TRANSACTION,
} from './constants';

export const getCourse = (id) => ({
  type: GET_COURSE,
  id,
});

export const setCourse = (course) => ({
  type: SET_COURSE,
  course,
});

export const createTransaction = (data, cbSuccess) => ({
  type: CREATE_TRANSACTION,
  data,
  cbSuccess,
});

export const setTransaction = (data) => ({
  type: SET_TRANSACTION,
  data,
});

export const createParticipant = (courseId) => ({
  type: CREATE_PARTICIPANT,
  courseId,
});

export const updateStatustransaction = (orderId, token, cbSuccess) => ({
  type: UPDATE_STATUS_TRANSACTION,
  orderId,
  token,
  cbSuccess,
});

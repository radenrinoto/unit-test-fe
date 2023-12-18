import { GET_MY_COURSE, SET_MY_COURSE } from './constants';

export const getMyCourse = () => ({
  type: GET_MY_COURSE,
});

export const setMyCourse = (data) => ({
  type: SET_MY_COURSE,
  data,
});

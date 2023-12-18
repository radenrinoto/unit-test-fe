import {
  UPDATE_COURSE,
  GET_INSTRUCTOR,
  SET_INSTRUCTOR,
  DELETE_COURSE,
  ADD_COURSE,
  UPDATE_COURSE_IMAGE,
} from './constants';

export const updateCourse = (id, data, cbSuccess) => ({
  type: UPDATE_COURSE,
  id,
  data,
  cbSuccess,
});

export const updateCourseImage = (id, data, cbSuccess) => ({
  type: UPDATE_COURSE_IMAGE,
  id,
  data,
  cbSuccess,
});

export const deleteCourse = (id, cbSuccess) => ({
  type: DELETE_COURSE,
  id,
  cbSuccess,
});

export const addCourse = (data, cbSuccess) => ({
  type: ADD_COURSE,
  data,
  cbSuccess,
});

export const getInstructors = () => ({
  type: GET_INSTRUCTOR,
});

export const setInstructors = (data) => ({
  type: SET_INSTRUCTOR,
  data,
});

import { GET_CATEGORIES, GET_COURSES, SET_CATEGORIES, SET_COURSES } from './constants';

export const getCourses = () => ({
  type: GET_COURSES,
});

export const setCourses = (courses) => ({
  type: SET_COURSES,
  courses,
});

export const getCategories = () => ({
  type: GET_CATEGORIES,
});

export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  categories,
});

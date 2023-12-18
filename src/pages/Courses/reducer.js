import { produce } from 'immer';

import { SET_CATEGORIES, SET_COURSES } from './constants';

export const initialState = {
  courses: [],
  categories: [],
};

export const storedKey = ['courses'];

const coursesReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_COURSES:
        draft.courses = action.courses;
        break;
      case SET_CATEGORIES:
        draft.categories = action.categories;
        break;
    }
  });

export default coursesReducer;

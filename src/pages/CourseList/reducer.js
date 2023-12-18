import { produce } from 'immer';

import { SET_MY_COURSE } from './constants';

export const initialState = {
  myCourses: [],
};

const myCourseReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_MY_COURSE:
        draft.myCourses = action.data;
        break;
    }
  });

export default myCourseReducer;

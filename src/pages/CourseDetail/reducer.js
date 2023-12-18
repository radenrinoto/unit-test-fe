import { produce } from 'immer';

import { SET_COURSE, SET_TRANSACTION } from './constants';

export const initialState = {
  course: {},
  transaction: {},
};

const courseReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_COURSE:
        draft.course = action.course;
        break;
      case SET_TRANSACTION:
        draft.transaction = action.data;
        break;
    }
  });

export default courseReducer;

import { produce } from 'immer';

import { SET_INSTRUCTOR } from './constants';

export const initialState = {
  instructors: [],
};

const instructorReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_INSTRUCTOR:
        draft.instructors = action.data;
        break;
    }
  });

export default instructorReducer;

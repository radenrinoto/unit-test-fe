import { produce } from 'immer';

import { FAILURE_REGISTER_USER, SUCCESS_REGISTER_USER } from './constants';

export const initialState = {
  successCreateUser: false,
};

const createUserReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SUCCESS_REGISTER_USER:
        draft.successCreateUser = true;
        break;
      case FAILURE_REGISTER_USER:
        draft.successCreateUser = false;
        break;
    }
  });

export default createUserReducer;

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectRegisterState = (state) => state.createUser || initialState;

export const selectRegister = createSelector(selectRegisterState, (state) => state.successCreateUser);

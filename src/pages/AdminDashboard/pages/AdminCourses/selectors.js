import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectInstructorState = (state) => state.instructors || initialState;

export const selectInstructors = createSelector(selectInstructorState, (state) => state.instructors);

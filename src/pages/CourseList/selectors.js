import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectMyCourseState = (state) => state.myCourse || initialState;

export const selectMyCourse = createSelector(selectMyCourseState, (state) => state.myCourses);

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectCoursesState = (state) => state.courses || initialState;

export const selectCourses = createSelector(selectCoursesState, (state) => state.courses);
export const selectCategories = createSelector(selectCoursesState, (state) => state.categories);

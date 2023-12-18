import { combineReducers } from 'redux';

import appReducer, { storedKey as storedAppState } from '@containers/App/reducer';
import clientReducer, { storedKey as storedClientState } from '@containers/Client/reducer';
import coursesReducer, { storedKey as storedCoursesState } from '@pages/Courses/reducer';
import languageReducer from '@containers/Language/reducer';
import courseReducer from '@pages/CourseDetail/reducer';
import myCourseReducer from '@pages/CourseList/reducer';
import createUserReducer from '@pages/Register/reducer';
import instructorReducer from '@pages/AdminDashboard/pages/AdminCourses/reducer';

import { mapWithPersistor } from './persistence';

const storedReducers = {
  app: { reducer: appReducer, whitelist: storedAppState },
  client: { reducer: clientReducer, whitelist: storedClientState },
  courses: { reducer: coursesReducer, whitelist: storedCoursesState },
};

const temporaryReducers = {
  language: languageReducer,
  course: courseReducer,
  myCourse: myCourseReducer,
  createUser: createUserReducer,
  instructors: instructorReducer,
};

const createReducer = () => {
  const coreReducer = combineReducers({
    ...mapWithPersistor(storedReducers),
    ...temporaryReducers,
  });
  const rootReducer = (state, action) => coreReducer(state, action);
  return rootReducer;
};

export default createReducer;

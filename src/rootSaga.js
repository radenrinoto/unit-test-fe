import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import coursesSaga from '@pages/Courses/saga';
import loginUserSaga from '@pages/Login/saga';
import courseSaga from '@pages/CourseDetail/saga';
import myCourseSaga from '@pages/CourseList/saga';
import createUserSaga from '@pages/Register/saga';
import logoutUserSaga from '@pages/Logout/saga';
import adminCourseSaga from '@pages/AdminDashboard/pages/AdminCourses/saga';
import forgotPasswordSaga from '@pages/ForgotPassword/saga';
import resetPasswordSaga from '@pages/ResetPassword/saga';

export default function* rootSaga() {
  yield all([
    coursesSaga(),
    appSaga(),
    loginUserSaga(),
    courseSaga(),
    myCourseSaga(),
    createUserSaga(),
    logoutUserSaga(),
    adminCourseSaga(),
    forgotPasswordSaga(),
    resetPasswordSaga(),
  ]);
}

import MainLayout from '@layouts/MainLayout';
import AdminDashboard from '@pages/AdminDashboard';
import CourseDetail from '@pages/CourseDetail';
import CourseList from '@pages/CourseList';
import Courses from '@pages/Courses';
import ForgotPassword from '@pages/ForgotPassword';

import Home from '@pages/Home';
import Login from '@pages/Login';
import Logout from '@pages/Logout';
import NotFound from '@pages/NotFound';
import Register from '@pages/Register';
import ResetPassword from '@pages/ResetPassword';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: false,
    component: Home,
    layout: MainLayout,
  },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
  {
    path: '/login',
    name: 'Login',
    protected: false,
    component: Login,
    layout: MainLayout,
  },
  {
    path: '/logout',
    name: 'Logout',
    protected: true,
    component: Logout,
    layout: MainLayout,
  },
  {
    path: '/register',
    name: 'Register',
    protected: false,
    component: Register,
    layout: MainLayout,
  },
  {
    path: '/courses',
    name: 'Courses',
    protected: false,
    component: Courses,
    layout: MainLayout,
  },
  {
    path: '/courses/:id',
    name: 'Courses Detail',
    protected: false,
    component: CourseDetail,
    layout: MainLayout,
  },
  {
    path: '/my-course',
    name: 'My Courses',
    protected: true,
    component: CourseList,
    layout: MainLayout,
  },
  {
    path: '/admin-dashboard/:params',
    name: 'Admin Dashboard',
    protected: true,
    component: AdminDashboard,
    layout: MainLayout,
  },
  {
    path: '/forgot-password',
    name: 'Forgot Password',
    protected: false,
    component: ForgotPassword,
    layout: MainLayout,
  },
  {
    path: '/reset-password/:token',
    name: 'Reset Password',
    protected: false,
    component: ResetPassword,
    layout: MainLayout,
  },
];

export default routes;

import config from '@config/index';
import { merge } from 'lodash';
import request from '@utils/request';

const urls = {
  ping: 'ping.json',
  courses: '/courses',
  courseCategory: '/course-category',
  login: '/user/user-login',
  user: '/user',
  transaction: '/transaction',
  instructors: '/instructor',
};

export const callAPI = async (endpoint, method, header = {}, params = {}, data = {}) => {
  const defaultHeader = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  };

  const headers = merge(defaultHeader, header);
  const options = {
    url: config.api.courses + endpoint,
    method,
    headers,
    data,
    params,
  };

  return request(options).then((response) => {
    const responseAPI = response.data;
    return responseAPI;
  });
};

export const ping = () => callAPI(urls.ping, 'get');
export const getCoursesApi = () => callAPI(urls.courses, 'get');
export const getCourseApi = (id) => callAPI(`${urls.courses}/${id}`, 'get');
export const getCourseCategoriesApi = () => callAPI(`${urls.courseCategory}`, 'get');
export const getCourseCategoryApi = (id) => callAPI(`${urls.courseCategory}/${id}`, 'get');

export const getMyCourseApi = () => callAPI(`${urls.courses}/my-course`, 'get');

export const registerApi = (data) => callAPI(`${urls.user}/register`, 'post', {}, {}, data);
export const loginApi = (data) => callAPI(`${urls.user}/user-login`, 'post', {}, {}, data);
export const logoutApi = () => callAPI(`${urls.user}/user-logout`, 'post', {}, {}, {});

export const createTransactionApi = (id) => callAPI(`${urls.transaction}/${id}`, 'post', {}, {}, {});

export const updateStatusTransactionApi = (token, data) => callAPI(`${urls.transaction}/${token}`, 'put', {}, {}, data);

export const createParticipantsApi = (courseId) =>
  callAPI(`${urls.courses}/register-participant/${courseId}`, 'post', {}, {}, {});

export const updateCourseApi = (id, data) => callAPI(`${urls.courses}/update-course/${id}`, 'put', {}, {}, data);

export const createCourseApi = (data) => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  if (data.image) {
    formData.append('image', data.image[0]);
  }

  return callAPI(
    `${urls.courses}`,
    'post',
    { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    {},
    formData
  );
};

export const updateCourseImageApi = (id, data) => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  if (data.image) {
    formData.append('image', data.image[0]);
  }

  return callAPI(
    `${urls.courses}/update-image/${id}`,
    'put',
    { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    {},
    formData
  );
};
export const deleteCourseApi = (id) => callAPI(`${urls.courses}/${id}`, 'delete');

export const getInstructorsApi = () => callAPI(urls.instructors, 'get');

export const createForgotPasswordApi = (data) => callAPI(`${urls.user}/forgot-password`, 'post', {}, {}, data);
export const resetPasswordApi = (token, data) => callAPI(`${urls.user}/user-password/${token}`, 'put', {}, {}, data);

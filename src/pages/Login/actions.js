import { USER_LOGIN } from './constants';

export const loginUser = (data) => ({
  type: USER_LOGIN,
  data,
});

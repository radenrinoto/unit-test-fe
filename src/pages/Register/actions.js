import { FAILURE_REGISTER_USER, REGISTER_USER, SUCCESS_REGISTER_USER } from './constants';

export const createUser = (user) => ({
  type: REGISTER_USER,
  user,
});

export const successCreateUser = () => ({
  type: SUCCESS_REGISTER_USER,
});

export const failureCreateUser = () => ({
  type: FAILURE_REGISTER_USER,
});

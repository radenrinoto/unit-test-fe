import { FORGOT_PASSWORD } from './constants';

export const createForgotPassword = (email) => ({
  type: FORGOT_PASSWORD,
  email,
});

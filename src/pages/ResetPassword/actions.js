import { RESET_PASSWORD } from './constants';

export const resetPassword = (token, data, cbSuccess) => ({
  type: RESET_PASSWORD,
  token,
  data,
  cbSuccess,
});

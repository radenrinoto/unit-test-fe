import { jwtDecode } from 'jwt-decode';

const decodeToken = (token) => {
  if (!token) {
    return null;
  }
  return jwtDecode(token);
};

export default decodeToken;

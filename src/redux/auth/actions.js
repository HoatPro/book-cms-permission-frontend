const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_ERROR = 'LOGIN_ERROR';
const LOGOUT = 'LOGOUT';
const login = (email, password) => ({
  type: LOGIN_REQUEST,
  payload: { email, password },
});

const logout = () => ({
  type: LOGOUT,
});

export default {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  login,
  logout,
};

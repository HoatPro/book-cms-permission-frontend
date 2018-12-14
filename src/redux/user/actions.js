const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'GET_USERS_FAILURE';

const getUsersRequest = amount => ({
  type: GET_USERS_REQUEST,
  payload: {
    amount,
  },
});

const getUsersSuccess = users => ({
  type: GET_USERS_SUCCESS,
  payload: {
    users,
  },
});

const getUsersFailure = () => ({
  type: GET_USERS_FAILURE,
});

export default {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  getUsersRequest,
  getUsersSuccess,
  getUsersFailure,
};

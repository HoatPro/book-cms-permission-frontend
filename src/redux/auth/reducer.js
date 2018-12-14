import cookie from '../../utils/cookie';
import actions from './actions';

const initState = {
  accessToken: cookie.get('access_token'),
  err: '',
  status: -3,
};

export default function authReducer(
  state = {
    ...initState,
    accessToken: cookie.get('access_token'),
  },
  action,
) {
  switch (action.type) {
    case actions.LOGIN_REQUEST:
      return {
        ...state,
        status: -1,
        err: '',
      };
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        accessToken: action.accessToken,
        status: 1,
      };
    case actions.LOGIN_ERROR:
      return {
        ...state,
        status: 0,
        err: action.err,
      };
    case actions.LOGOUT:
      return {
        ...initState,
        accessToken: null,
      };
    default:
      return state;
  }
}

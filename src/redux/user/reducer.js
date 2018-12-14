import actions from './actions';

const initialState = {
  users: [],
  loading: false,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case actions.GET_USERS_REQUEST:
    case actions.GET_USERS_FAILURE: {
      return {
        ...state,
        loading: true,
      };
    }
    case actions.GET_USERS_SUCCESS: {
      const { users } = action.payload;
      return {
        ...state,
        loading: false,
        users,
      };
    }
    default:
      return state;
  }
}

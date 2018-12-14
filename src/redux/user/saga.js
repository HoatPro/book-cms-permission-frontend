import { all, call, takeEvery, put, fork } from 'redux-saga/effects';
import actions from './actions';
import { fetchRandomUsers } from '../../apis/user';

export function* userRequest() {
  yield takeEvery(actions.GET_USERS_REQUEST, function*(action) {
    const { amount } = action.payload;
    try {
      const { users } = yield call(fetchRandomUsers, amount);
      if (users) {
        yield put(actions.getUsersSuccess(users));
      } else {
        throw new Error();
      }
    } catch (err) {
      yield put(actions.getUsersFailure());
    }
  });
}

export default function* rootSaga() {
  yield all([fork(userRequest)]);
}

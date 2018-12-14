import { all, takeEvery, put, fork } from 'redux-saga/effects';
import cookie from '../../utils/cookie';
import actions from './actions';
import { loginRequestApi } from '../../apis/auth';

export function* loginRequest() {
  yield takeEvery(actions.LOGIN_REQUEST, function* (action) {
    try {
      const { email, password } = action.payload;
      const { accessToken } = yield loginRequestApi(
        email,
        password,
      );
      if (accessToken) {
        yield put({
          type: actions.LOGIN_SUCCESS,
          accessToken,
        });
      } else {
        yield put({
          type: actions.LOGIN_ERROR,
          err: 'Tên đăng nhập hoặc mật khẩu không đúng',
        });
      }
    } catch (err) {
      yield put({
        type: actions.LOGIN_ERROR,
        err: 'Tên đăng nhập hoặc mật khẩu không đúng',
      });
    }
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function* (payload) {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    yield cookie.set({
      name: 'access_token',
      value: payload.accessToken,
      expires,
    });
  });
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function* () {
    yield cookie.unset('access_token');
  });
}

export default function* rootSaga() {
  yield all([
    fork(loginRequest),
    fork(loginSuccess),
    fork(logout),
  ]);
}

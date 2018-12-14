import { all } from 'redux-saga/effects';
import userSagas from './user/saga';
import authSagas from './auth/saga';

export default function* rootSaga() {
  yield all([userSagas(), authSagas()]);
}

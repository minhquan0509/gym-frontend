import { all } from 'redux-saga/effects';
import { watchLogin } from './sagas/authSagas';

function* rootSaga() {
  yield all([
    watchLogin()
    // Add other sagas here if needed
  ]);
}

export default rootSaga;
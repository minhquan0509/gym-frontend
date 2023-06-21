import { call, put, takeLatest } from 'redux-saga/effects';
import {
  loginRequest,
  loginSuccess,
  loginFailure
} from '../actions/authActions';
import { loginApi } from '../api/authApi';

function* loginSaga(action) {
  try {
    const { username, password } = action.payload;
    // Make API call
    const response = yield call(loginApi, username, password);
    // Dispatch success action
    const token = response.token;
    const currentUser = response.data.currentUser
    localStorage.setItem('user', JSON.stringify(currentUser));
    localStorage.setItem('token', token);
    yield put(loginSuccess(currentUser, token));
  } catch (error) {
    // Dispatch failure action
    yield put(loginFailure(error.message));
  }
}

export function* watchLogin() {
  yield takeLatest(loginRequest, loginSaga);
}
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from '../types/authTypes';
import { createAction } from 'redux-actions';

export const loginRequest = createAction(LOGIN_REQUEST);

export const loginSuccess = createAction(LOGIN_SUCCESS, (user, token) => ({ user, token }));

export const loginFailure = createAction(LOGIN_FAILURE);

export const logout = createAction(LOGOUT);

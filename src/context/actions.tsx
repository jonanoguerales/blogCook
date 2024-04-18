import { Action, User } from '../lib/interfaces';
export const LoginStart = (userCredentials: any): Action => ({
  type: 'LOGIN_START',
});

export const LoginSuccess = (user: User): Action => ({
  type: 'LOGIN_SUCCESS',
  payload: user,
});

export const LoginFailure = (): Action => ({
  type: 'LOGIN_FAILURE',
});

export const Logout = (): Action => ({
  type: 'LOGOUT',
});

export const UpdateStart = (userCredentials: any): Action => ({
  type: 'UPDATE_START',
});

export const UpdateSuccess = (user: User): Action => ({
  type: 'UPDATE_SUCCESS',
  payload: user,
});

export const UpdateFailure = (): Action => ({
  type: 'UPDATE_FAILURE',
});
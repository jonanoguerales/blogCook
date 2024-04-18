import { Action, State } from '../lib/interfaces';

export const Reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        user: null,
        isFetching: true,
        error: false,
        dispatch: state.dispatch
      };
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload ?? null,
        isFetching: false,
        error: false,
        dispatch: state.dispatch
      };
    case 'LOGIN_FAILURE':
      return {
        user: null,
        isFetching: false,
        error: true,
        dispatch: state.dispatch
      };
    case 'UPDATE_START':
      return {
        ...state,
        isFetching: true,
        dispatch: state.dispatch
      };
    case 'UPDATE_SUCCESS':
      return {
        user: action.payload ?? state.user,
        isFetching: false,
        error: false,
        dispatch: state.dispatch
      };
    case 'UPDATE_FAILURE':
      return {
        user: state.user,
        isFetching: false,
        error: true,
        dispatch: state.dispatch
      };
    case 'LOGOUT':
      return {
        user: null,
        isFetching: false,
        error: false,
        dispatch: state.dispatch
      };
    default:
      return state;
  }
};
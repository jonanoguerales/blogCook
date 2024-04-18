"use client";
import React, { createContext, useEffect, useReducer } from 'react';
import { State } from '../lib/interfaces';
import { Reducer } from './reducer';

const INITIAL_STATE: State = {
  user: null,
  isFetching: false,
  error: false,
  dispatch: () => { },
};

export const Context = createContext<State>(INITIAL_STATE);

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
      dispatch({ type: 'SET_USER', payload: storedUser });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(state.user));
    }
  }, [state.user]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};

import { LoginResponseType } from './../../types/auth.d';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { LoginFormType } from '@/types/form';

function getInitState(): LoginResponseType {
  if (typeof window !== 'undefined') {
    return {
      newAccount: JSON.parse(localStorage.getItem('current_user') || '{}'),
      accessToken: localStorage.getItem('access_token') || '',
      refreshToken: localStorage.getItem('refresh_token') || '',
    };
  }
  return {
    newAccount: {},
    accessToken: '',
    refreshToken: '',
  };
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: getInitState(),
  reducers: {
    login: (state, payload: PayloadAction<LoginFormType>) => {},
    loginSuccess: (state, payload: PayloadAction<LoginResponseType>) => {
      return {
        ...state,
        ...payload.payload,
      };
    },
    logout: (state) => {
      state.accessToken = '';
      state.refreshToken = '';
      state.newAccount = {};
    },
  },
});

export const authActions = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth;

export const authReducer = authSlice.reducer;

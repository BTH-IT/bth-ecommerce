import { LoginResponseType } from './../../types/auth.d';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { LoginFormType } from '@/types/form';

type LoginSliceType = LoginResponseType & {
  loggedIn: boolean;
  cartList: any[];
};

function getInitState(): LoginSliceType {
  if (typeof window !== 'undefined') {
    return {
      newAccount: JSON.parse(localStorage.getItem('current_user') || '{}'),
      accessToken: localStorage.getItem('access_token') || '',
      refreshToken: localStorage.getItem('refresh_token') || '',
      loggedIn: false,
      cartList: JSON.parse(localStorage.getItem('cart_list') || '[]'),
    };
  }
  return {
    newAccount: {},
    accessToken: '',
    refreshToken: '',
    loggedIn: false,
    cartList: [],
  };
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: getInitState(),
  reducers: {
    login: (state, payload: PayloadAction<LoginFormType>) => {},
    refreshToken: (
      state,
      payload: PayloadAction<{ refreshToken: string }>,
    ) => {},
    updateAccessToken: (
      state,
      payload: PayloadAction<{ accessToken: string }>,
    ) => {
      return {
        ...state,
        accessToken: payload.payload.accessToken,
      };
    },
    updateCartList: (state, payload: PayloadAction<{ cartList: any[] }>) => {
      return {
        ...state,
        cartList: payload.payload.cartList,
      };
    },
    loginSuccess: (state, payload: PayloadAction<LoginSliceType>) => {
      return {
        ...state,
        ...payload.payload,
      };
    },
    logout: (state) => {
      state.accessToken = '';
      state.refreshToken = '';
      state.newAccount = {};
      state.loggedIn = false;
    },
    loginFailed: (state) => {
      state.accessToken = '';
      state.refreshToken = '';
      state.newAccount = {};
      state.loggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth;

export const authReducer = authSlice.reducer;

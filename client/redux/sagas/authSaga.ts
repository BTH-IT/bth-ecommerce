'use client';

import { call, put, take, fork } from 'redux-saga/effects';
import { LoginFormType } from '@/types/form';
import authService from '@/services/authService';
import { authActions } from '../features/authSlice';
import { PayloadAction } from '@reduxjs/toolkit';

export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

export function* handleLogin(payload: LoginFormType) {
  try {
    const res: ResponseGenerator = yield call(authService.login, payload);

    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', res.data.accessToken);
      localStorage.setItem('current_user', JSON.stringify(res.data.newAccount));
      localStorage.setItem('refresh_token', res.data.refreshToken);
    }

    yield put(authActions.loginSuccess(res.data));
  } catch (error) {
    // yield put(authActions.loginFailed());
  }
}

function* handleLogout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('current_user');
  }
}

function* watchLoginFlow() {
  while (true) {
    let isLoggedIn = false;

    if (typeof window !== 'undefined') {
      isLoggedIn = Boolean(localStorage.getItem('access_token') || '');
    }

    if (!isLoggedIn) {
      const action: PayloadAction<LoginFormType> = yield take(
        authActions.login.type,
      );

      yield fork(handleLogin, action.payload);
      continue;
    }

    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}

'use client';

import { call, put, take, fork } from 'redux-saga/effects';
import { LoginFormType } from '@/types/form';
import authService from '@/services/authService';
import { authActions } from '../features/authSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import * as jwt from 'jsonwebtoken';

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
      localStorage.setItem('current_user', JSON.stringify(res.data.user));
      localStorage.setItem(
        'current_account',
        JSON.stringify(res.data.newAccount),
      );
      localStorage.setItem('refresh_token', res.data.refreshToken);
    }

    yield put(
      authActions.loginSuccess({
        ...res.data,
        loggedIn: true,
      }),
    );
  } catch (error) {
    yield put(authActions.loginFailed());
  }
}

function* handleLogout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('current_user');
    localStorage.removeItem('current_account');
    yield put(authActions.logout());
  }
}

function* handleRefreshToken(refreshToken: string) {
  try {
    const res: ResponseGenerator = yield call(
      authService.refresh,
      refreshToken,
    );

    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', res.data.accessToken);
    }

    yield put(
      authActions.updateAccessToken({
        accessToken: res.data.accessToken,
      }),
    );
  } catch (error) {
    yield put(authActions.loginFailed());
  }
}

function* watchLoginFlow() {
  while (true) {
    let isLoggedIn = false;

    if (typeof window !== 'undefined') {
      const refreshToken = localStorage.getItem('refresh_token') || '';

      if (refreshToken) {
        const now = Math.floor(Date.now() / 1000);
        const refreshTokenDecode: any = jwt.decode(refreshToken);

        if (now > refreshTokenDecode.exp && refreshTokenDecode) {
          isLoggedIn = false;
          yield call(handleLogout);
        } else {
          const accessToken = localStorage.getItem('access_token') || '';

          const accessTokenDecode: any = jwt.decode(accessToken);

          isLoggedIn = true;

          if (now > accessTokenDecode.exp && accessTokenDecode) {
            yield call(handleRefreshToken, refreshToken);
          }
        }
      } else {
        yield call(handleLogout);
      }
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

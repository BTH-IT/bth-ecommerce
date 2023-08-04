'use client';
import { CartType } from '@/types/cart';
import { ProductType } from '@/types/product';
import toast from 'react-hot-toast';
import * as jwt from 'jsonwebtoken';
import { authActions } from '@/redux/features/authSlice';
import authService from '@/services/authService';
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

export type SearchParamsType = { [key: string]: string };

export function handleSearchParamsToObject(params: ReadonlyURLSearchParams) {
  const searchParams: SearchParamsType = {};

  params.forEach((value, key) => {
    searchParams[key] = value;
  });

  return searchParams;
}

export function handleSearchParamsToStringUrl(searchParams: SearchParamsType) {
  let searchParamsUrlString = '';

  for (const key in searchParams) {
    if (!searchParamsUrlString) {
      searchParamsUrlString += `${key}=${searchParams[key]}`;
      continue;
    }
    searchParamsUrlString += `&${key}=${searchParams[key]}`;
  }

  return searchParamsUrlString;
}

export function handleRemoveSearchParamsToStringUrl(
  searchParams: SearchParamsType,
  removeKey: string,
) {
  let searchParamsUrlString = '';

  for (const key in searchParams) {
    if (key === removeKey) continue;
    if (!searchParamsUrlString) {
      searchParamsUrlString += `${key}=${searchParams[key]}`;
      continue;
    }
    searchParamsUrlString += `&${key}=${searchParams[key]}`;
  }

  return searchParamsUrlString;
}

export function handleUpdateRouter(
  key: string,
  value: string,
  searchParams: ReadonlyURLSearchParams,
  router: AppRouterInstance,
) {
  const searchParamsObject: SearchParamsType =
    handleSearchParamsToObject(searchParams);

  searchParamsObject[key] = value;
  router.push('/search?' + handleSearchParamsToStringUrl(searchParamsObject));
}

export function handleRemoveRouter(
  key: string,
  searchParams: ReadonlyURLSearchParams,
  router: AppRouterInstance,
) {
  const searchParamsObject: SearchParamsType =
    handleSearchParamsToObject(searchParams);

  router.replace(
    '/search?' + handleRemoveSearchParamsToStringUrl(searchParamsObject, key),
  );
}

export function handleCart(product: ProductType) {
  const cart = {
    _id: product._id,
    thumbUrl: product.imageUrlList[0],
    productName: product.productName,
    amount: 1,
    salePercent: product.salePercent,
    originPrice: product.originPrice,
    remain: product.remain,
  };

  const cartList: CartType[] = JSON.parse(
    localStorage.getItem('cart_list') || '[]',
  );

  const isHad = cartList.findIndex((c: CartType) => c._id === cart._id);

  if (isHad !== -1) {
    if (cartList[isHad].amount + cart.amount > cart.remain) {
      toast.error('Số lượng sản phẩm đã hết!!');
      return false;
    }
    cartList[isHad].amount += cart.amount;
  } else {
    cartList.push(cart);
  }

  localStorage.setItem('cart_list', JSON.stringify(cartList));

  return true;
}

async function updateAccessToken(refreshToken: string, dispatch: any) {
  try {
    const res: any = await authService.refresh(refreshToken);

    localStorage.setItem('access_token', res.data.accessToken);

    dispatch(
      authActions.updateAccessToken({
        accessToken: res.data.accessToken,
      }),
    );
    return true;
  } catch (error) {
    dispatch(authActions.logout());
    return false;
  }
}

export async function handleRefreshToken(dispatch: any) {
  const refreshToken = localStorage.getItem('refresh_token') || '';

  if (refreshToken) {
    const now = Math.floor(Date.now() / 1000);
    const refreshTokenDecode: any = jwt.decode(refreshToken);

    if (now > refreshTokenDecode.exp && refreshTokenDecode) {
      dispatch(authActions.logout());
      return false;
    } else {
      const accessToken = localStorage.getItem('access_token') || '';

      const accessTokenDecode: any = jwt.decode(accessToken);

      if (now > accessTokenDecode.exp && accessTokenDecode) {
        await updateAccessToken(refreshToken, dispatch);
      }
      return true;
    }
  }

  dispatch(authActions.logout());
  return false;
}

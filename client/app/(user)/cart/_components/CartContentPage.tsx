'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import TableBodyCart from './TableBodyCart';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { authActions, selectAuth } from '@/redux/features/authSlice';
import { CartType } from '@/types/cart';
import Link from 'next/link';
import SelectForm from '../../(auth)/_components/SelectForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getAllProduct } from '@/utils/serverActions';
import Button from '@/components/Button';
import toast from 'react-hot-toast';
import orderService from '@/services/orderService';
import { convertCurrency } from '@/utils/contains';
import { handleRefreshToken } from '@/utils/clientActions';
import { useRouter } from 'next/navigation';

const schema = yup
  .object({
    payType: yup
      .string()
      .required('This field is required')
      .oneOf(
        ['momo', 'vnpay', 'received'],
        'This field must be equal to one of momo, vnpay or received',
      ),
  })
  .required();

const CartContentPage = () => {
  const cartList: CartType[] = useAppSelector(selectAuth).cartList;
  const loggedIn: boolean = useAppSelector(selectAuth).loggedIn;
  const totalPay = cartList.reduce((p, c) => {
    return p + c.originPrice - (c.originPrice * c.salePercent) / 100;
  }, 0);
  const user: any = useAppSelector(selectAuth).user;
  const dispatch = useAppDispatch();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    handleSubmit,
    reset,
    formState: { isValid, isSubmitting },
    control,
  } = useForm<any>({
    defaultValues: {
      payType: '',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const handleRemoveAll = () => {
    localStorage.setItem('cart_list', '[]');
    dispatch(
      authActions.updateCartList({
        cartList: [],
      }),
    );
  };

  const handleBuy = async (values: { payType: string }) => {
    if (!loggedIn) {
      toast.error('Bạn hãy đăng nhận trước khi mua hàng');

      setTimeout(() => {
        router.push('/login');
      }, 1000);

      return;
    }

    if (!isValid || cartList.length <= 0) return;

    const productList = await getAllProduct();

    const validCartList: CartType[] = [];
    const invalidCartList: CartType[] = [];

    cartList.forEach((cart: CartType) => {
      const isValidCart = Boolean(
        productList.find((product) => cart.amount <= product.remain),
      );
      if (isValidCart) validCartList.push(cart);
      else invalidCartList.push(cart);
    });

    if (invalidCartList.length > 0) {
      invalidCartList.forEach((cart) => {
        const product = productList.find((pro) => pro._id === cart._id);
        toast(
          `${product?.productName} is currently only ${product?.remain} products`,
          {
            duration: 10000,
          },
        );
      });
      return;
    }

    const boughtProducts = cartList.map((cart) => {
      return {
        product: cart._id,
        price: cart.originPrice - (cart.originPrice * cart.salePercent) / 100,
        amount: cart.amount,
      };
    });

    const data = {
      boughtProducts,
      user: user._id,
      purchaseForm: values.payType,
    };

    try {
      await orderService.add(data);

      toast.success('Payment successfully!!');
      localStorage.setItem('cart_list', '[]');
      dispatch(authActions.updateCartList({ cartList: [] }));
      reset();
    } catch (error: any) {
      if (error.statusCode === 403) {
        await handleRefreshToken(dispatch);
        try {
          await orderService.add(data);

          toast.success('Payment successfully!!');
          localStorage.setItem('cart_list', '[]');
          dispatch(authActions.updateCartList({ cartList: [] }));
          reset();
        } catch (error: any) {
          toast.error(error.message);
        }
      } else {
        toast.error(error.message);
      }
    }
  };

  return mounted && cartList.length > 0 ? (
    <div className="grid grid-cols-12 gap-3">
      <div className="col-span-8">
        <div className="detele-row">
          <div className="cart-title-delete">
            <div className="cart-title">
              <h4>Giỏ hàng</h4>
            </div>
            <div className="cart-delete">
              <span className="delete" onClick={handleRemoveAll}>
                Xoá tất cả
              </span>
            </div>
          </div>
        </div>
        <div className="table-row row">
          <div className="cart-table_container table-responsive-xxl text-nowrap">
            <table className="table cart-table table-xxl table-borderless">
              <thead className="table-head">
                <tr className="table-head_row">
                  <th className="table-head_item">STT</th>
                  <th className="table-head_item">Brand</th>
                  <th className="table-head_item">Đơn giá</th>
                  <th className="table-head_item">Số lượng</th>
                </tr>
              </thead>
              <tbody className="table-body">
                <TableBodyCart cartList={cartList}></TableBodyCart>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="col-span-4 gap-3">
        <div className="mt-14 total-container">
          <form action="" onSubmit={handleSubmit(handleBuy)}>
            <SelectForm name="payType" title="Pay Method" control={control}>
              <option value="" hidden>
                Chọn phương thức thanh toán
              </option>
              <option value="momo">Thanh toán bằng MomoPay</option>
              <option value="vnpay">Thanh toán bằng VNPay</option>
              <option value="received">Thanh toán khi nhận hàng</option>
            </SelectForm>
            <div className="total-title text-primary">
              <h5>Thành tiền</h5>
            </div>
            <div className="pre-price_container">
              <div className="pre-price_title">Tổng tạm tính</div>
              <div className="pre-price">{convertCurrency(totalPay)}</div>
            </div>
            <div className="total-price_container">
              <div className="total-price_title">Thành tiền</div>
              <div className="total-price">{convertCurrency(totalPay)}</div>
            </div>
            <div className="purchase-btn_container">
              <Button
                className="purchase-btn"
                type="submit"
                disabled={isSubmitting}
              >
                THANH TOÁN
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <div className="no-product-container">
      <Image
        src="/empty_cart.png"
        alt={'empty cart'}
        width={100000}
        height={10000}
      />
      <p className="no-product-info">Giỏ hàng chưa có sản phẩm nào</p>
      <Link href="/">
        <button type="button" className="no-product-btn">
          MUA SẮM NGAY
        </button>
      </Link>
    </div>
  );
};

export default CartContentPage;

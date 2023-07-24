'use client';

import { authActions, selectAuth } from '@/redux/features/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import productService from '@/services/productService';
import { CartType } from '@/types/cart';
import { convertCurrency } from '@/utils/contains';
import debounce from 'lodash.debounce';
import Image from 'next/image';
import Link from 'next/link';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import AmountAction from './AmountAction';

const TableBodyCart = ({ cartList }: { cartList: CartType[] }) => {
  return cartList.map((cart, idx) => (
    <tr className="table-body_row" key={idx}>
      <td className="table-body_item">{idx + 1}</td>
      <td className="table-body_item">
        <Link className="product-link" href={`/product-detail/${cart._id}`}>
          <div className="product-container">
            <div className="product-img_container">
              <Image
                className="product-img"
                src={cart.thumbUrl}
                alt={cart.productName + cart._id}
                width={80}
                height={60}
              />
            </div>
            <div className="product-name_container">
              <span className="product-name">{cart.productName}</span>
            </div>
          </div>
        </Link>
      </td>
      <td className="table-body_item">
        <div className="product-price_container">
          {cart.salePercent !== 0 && cart.salePercent ? (
            <>
              <div className="product-price">
                {convertCurrency(
                  (cart.originPrice * (100 - cart.salePercent)) / 100,
                )}
              </div>
              <div className="product-cost">
                {convertCurrency(cart.originPrice)}
              </div>
            </>
          ) : (
            <div className="product-price">
              {convertCurrency(cart.originPrice)}
            </div>
          )}
        </div>
      </td>
      <td className="table-body_item">
        <AmountAction cart={cart}></AmountAction>
        <div className="delete-product">Xoá</div>
      </td>
    </tr>
  ));
};

export default TableBodyCart;

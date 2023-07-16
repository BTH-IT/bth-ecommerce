import { convertCurrency } from '@/utils/contains';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const TableBodyCart = ({ cartList }: { cartList: any[] }) => {
  return cartList.map((cart, idx) => (
    <tr className="table-body_row">
      <td className="table-body_item">{idx + 1}</td>
      <td className="table-body_item">
        <Link className="product-link" href={`/product-detail/${cart._id}`}>
          <div className="product-container">
            <div className="product-img_container">
              <Image
                className="product-img"
                src={cart.thumbUrl}
                alt={cart.productName}
                width={10000}
                height={10000}
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
        <div className="product-amount_container">
          <button className="product-amount_minus">-</button>
          <input
            className={`amount-${idx + 1 + cart.productName}`}
            type="number"
            name="amount"
            id="amount"
            min="1"
            value={cart.amount}
          />
          <button className="product-amount_plus">+</button>
        </div>
        <div className="delete-product">Xoá</div>
      </td>
    </tr>
  ));
};

export default TableBodyCart;

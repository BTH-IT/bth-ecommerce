import { OrderType } from '@/types/order';
import moment from 'moment';
import React from 'react';
import '../../../../css/components/see-more.css';
import Image from 'next/image';
import { convertCurrency } from '@/utils/contains';

const SeeMoreOrder = ({ order }: { order: OrderType }) => {
  return (
    <div className="see-more">
      <span className="see-more_title">Order Id: #{order._id}</span>
      <div className="text-gray-500 see-more_date">
        Order date: {moment(order.createdAt).format('L')}
      </div>
      {order.isPaid ? (
        <span className="font-semibold text-green-400 see-more_delivery-date">
          Delivery date: {moment(order.updatedAt).format('L')}
        </span>
      ) : (
        <span className="font-semibold text-red-400">
          Payment status: Unpaid
        </span>
      )}
      <span className={`font-semibold my-3`}>
        Status:{' '}
        <span className={`font-semibold ${order.status} status`}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </span>
      <div className="see-more_info-user">
        <span className="see-more_title">Order User Information</span>
        <span className="see-more_info-user-title">
          <span className="font-semibold">Fullname: </span>
          {order.fullname}
        </span>
        <span className="see-more_info-user-title">
          <span className="font-semibold">Address: </span>
          {order.address}
        </span>
        <span className="see-more_info-user-title">
          <span className="font-semibold">Phone: </span>
          {order.phone}
        </span>
        <span className="see-more_info-user-title">
          <span className="font-semibold">Purchase From: </span>
          {order.purchaseForm}
        </span>
      </div>
      <div className="see-more_product-list">
        <span className="see-more_title">Ordered Product List</span>
        {order.boughtProducts.length > 0 && (
          <ul className="see-more_list">
            {order.boughtProducts.map((product) => (
              <li className="see-more_item" key={product.product._id}>
                <Image
                  src={product.product.imageUrlList[0]}
                  alt={product.product.productName}
                  width={200}
                  height={200}
                ></Image>
                <div className="see-more_item-content">
                  <span>Id: {product.product._id}</span>
                  <span>Product Name: {product.product.productName}</span>
                  <span>Brand: {product.product.brand.name}</span>
                  <span>Price: {convertCurrency(product.price)} / product</span>
                  <span>Amount: {product.amount}</span>
                  <span>
                    Total Price:{' '}
                    {convertCurrency(product.price * product.amount)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="see-more_total-pay">
        <span className="see-more_title">Total Payment:</span>
        <span className="font-bold text-blue-600">
          {convertCurrency(order.totalPay)}
        </span>
      </div>
    </div>
  );
};

export default SeeMoreOrder;

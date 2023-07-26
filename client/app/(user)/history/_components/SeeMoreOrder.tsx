import { OrderType } from '@/types/order';
import moment from 'moment';
import React from 'react';

const SeeMoreOrder = ({ order }: { order: OrderType }) => {
  return (
    <div className="see-more">
      <span className="see-more_title">Id: {order._id}</span>
      <span className="see-more_title">Fullname: {order.fullname}</span>
      <span className="see-more_title">Address: {order.address}</span>
      <span className="see-more_title">Phone: {order.phone}</span>
      <span className="see-more_title">
        Date: {moment(order.createdAt).format('L')}
      </span>
      <span className="see-more_title">
        Purchase From: {order.purchaseForm}
      </span>
      <span className="see-more_title">Is Paid: {order.isPaid}</span>
      <span className="see-more_title">Status: {order.status}</span>
      <span className="see-more_title">Total Pay: {order.totalPay}</span>
      {order.boughtProducts.length > 0 && (
        <ul className="see-more_list">
          {order.boughtProducts.map((product) => (
            <li className="see-more_item" key={product.product._id}>
              <span className="see-more_item-id">
                Id: {product.product._id}
              </span>
              <span className="see-more_item-name">
                Product Name: {product.product.productName}
              </span>
              <span className="see-more_item-amount">
                Amount: {product.amount}
              </span>
              <span className="see-more_item-id">Price: {product.price}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SeeMoreOrder;

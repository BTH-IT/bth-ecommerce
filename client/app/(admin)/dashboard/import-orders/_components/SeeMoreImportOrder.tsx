import moment from 'moment';
import React from 'react';
import Image from 'next/image';
import { convertCurrency } from '@/utils/contains';
import { ImportOrderType } from '@/types/import-order';
import '@/css/components/see-more.css';

const SeeMoreOrder = ({ importOrder }: { importOrder: ImportOrderType }) => {
  return (
    <div className="see-more">
      <span className="see-more_title">Order Id: #{importOrder._id}</span>
      <div className="text-gray-500 see-more_date">
        Import Order date: {moment(importOrder.createdAt).format('L')}
      </div>
      <span className={`font-semibold my-3`}>
        Employee:{' '}
        <span className={`font-semibold`}>
          {importOrder.employee.name.charAt(0).toUpperCase() +
            importOrder.employee.name.slice(1)}
        </span>
      </span>
      <span className={`font-semibold my-3`}>
        Supplier:{' '}
        <span className={`font-semibold`}>
          {importOrder.supplier.name.charAt(0).toUpperCase() +
            importOrder.supplier.name.slice(1)}
        </span>
      </span>
      <span className={`font-semibold my-3`}>
        Benefit Percent:{' '}
        <span className={`font-semibold`}>{importOrder.benefitPercent} %</span>
      </span>
      <div className="see-more_product-list">
        <span className="see-more_title">Import Order Product List</span>
        {importOrder.importProducts.length > 0 && (
          <ul className="see-more_list">
            {importOrder.importProducts.map((product) => (
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
          {convertCurrency(importOrder.totalPay)}
        </span>
      </div>
    </div>
  );
};

export default SeeMoreOrder;

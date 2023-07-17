import { ProductType } from '@/types/product';
import { convertCurrency } from '@/utils/contains';
import React from 'react';

const AmountAndPriceProduct = ({ product }: { product: ProductType }) => {
  return (
    <>
      <div
        className={`product__info-status ${product.remain <= 0 ? 'empty' : ''}`}
      >
        {product.remain > 0 ? 'CÒN HÀNG' : 'HẾT HÀNG'}
      </div>
      <div className="product__info-name">{product.productName}</div>
      <div className="product__info-brand">
        Thương hiệu {product.brand.name.toUpperCase()} | Mã sản phẩm:{' '}
        {product._id}
      </div>
      {product.remain > 0 && product.remain <= 10 && (
        <div className="product__info-warning-amount">
          {product.remain} sản phẩm
        </div>
      )}
      <div className="product__info-price_container">
        {product.salePercent > 0 ? (
          <>
            <div className="product__info-price">
              {convertCurrency(
                product.originPrice -
                  (product.originPrice * product.salePercent) / 100,
              )}
            </div>
            <div className="product__info-cost_container">
              <span className="product__info-cost">
                {convertCurrency(product.originPrice)}
              </span>
              <span className="product__info-discount">
                -{product.salePercent}%
              </span>
            </div>
          </>
        ) : (
          <div className="product__info-price">
            {convertCurrency(product.originPrice)}
          </div>
        )}
      </div>
    </>
  );
};

export default AmountAndPriceProduct;

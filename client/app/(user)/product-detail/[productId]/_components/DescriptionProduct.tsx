import React from 'react';

const DescriptionProduct = ({ description }: { description: string }) => {
  return (
    <>
      <h4>Mô tả sản phẩm</h4>
      <div className="product__detail-description">{description}</div>
    </>
  );
};

export default DescriptionProduct;

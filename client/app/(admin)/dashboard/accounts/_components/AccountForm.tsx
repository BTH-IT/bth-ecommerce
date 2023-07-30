import { ProductType } from '@/types/product';
import React from 'react';

const ProductForm = ({
  add,
  handleClose,
  product = null,
}: {
  add: boolean;
  handleClose: () => void;
  product?: ProductType | null;
}) => {
  return <div>ProductForm</div>;
};

export default ProductForm;

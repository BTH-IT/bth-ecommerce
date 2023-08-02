import { ProductType } from '@/types/product';
import { SupplierType } from '@/types/supplier';
import React from 'react';

const SupplierForm = ({
  add,
  handleClose,
  supplier = null,
}: {
  add: boolean;
  handleClose: () => void;
  supplier?: SupplierType | null;
}) => {
  return <div>ProductForm</div>;
};

export default SupplierForm;

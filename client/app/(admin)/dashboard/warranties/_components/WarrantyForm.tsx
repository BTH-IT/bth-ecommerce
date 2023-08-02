import { ProductType } from '@/types/product';
import { WarrantyType } from '@/types/warranty';
import React from 'react';

const WarrantyForm = ({
  handleClose,
  warranty = null,
}: {
  handleClose: () => void;
  warranty?: WarrantyType | null;
}) => {
  return <div>ProductForm</div>;
};

export default WarrantyForm;

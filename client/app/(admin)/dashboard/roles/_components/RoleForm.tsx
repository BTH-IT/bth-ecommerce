import { ProductType } from '@/types/product';
import { RoleType } from '@/types/role';
import React from 'react';

const RoleForm = ({
  add,
  handleClose,
  role = null,
}: {
  add: boolean;
  handleClose: () => void;
  role: RoleType | null;
}) => {
  return <div>ProductForm</div>;
};

export default RoleForm;

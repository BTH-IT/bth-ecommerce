import { UserType } from '@/types/auth';
import React from 'react';

const UserForm = ({
  add,
  handleClose,
  user = null,
}: {
  add: boolean;
  handleClose: () => void;
  user?: UserType | null;
}) => {
  return <div>ProductForm</div>;
};

export default UserForm;

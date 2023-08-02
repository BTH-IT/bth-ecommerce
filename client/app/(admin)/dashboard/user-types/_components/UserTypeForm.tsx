import { UserGenreType } from '@/types/user-type';
import React from 'react';

const UserTypeForm = ({
  add,
  handleClose,
  userType = null,
}: {
  add: boolean;
  handleClose: () => void;
  userType?: UserGenreType | null;
}) => {
  return <div>ProductForm</div>;
};

export default UserTypeForm;

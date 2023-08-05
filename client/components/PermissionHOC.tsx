import { useCheckPermission } from '@/hooks/useCheckPermission';
import React from 'react';

const PermissionHOC = (Component: () => React.JSX.Element) => {
  useCheckPermission();
  return <Component></Component>;
};

export default PermissionHOC;

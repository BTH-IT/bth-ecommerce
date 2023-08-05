'use client';

import Button from '@/components/Button';
import { RoleType } from '@/types/role';
import React, { FormEvent } from 'react';
import ToggleRoles from './ToggleRoles';
import roleService from '@/services/roleService';
import { handleRefreshToken } from '@/utils/clientActions';
import { useAppDispatch } from '@/redux/hooks';

const AuthorizationForm = ({
  handleClose,
  role,
  handleUpdate,
}: {
  handleClose: () => void;
  role: RoleType | null;
  handleUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await handleRefreshToken(dispatch);

      const nodeList = [...(e.target as any)];

      const features = role?.features.map((f) => {
        const actionNodeList = nodeList.filter(
          (node) =>
            node.name === f.feature.name &&
            node.checked &&
            node.dataset.action !== 'ALL',
        );

        const actionTextList = actionNodeList.map(
          (node) => node.dataset.action,
        );

        return {
          ...f,
          actions: actionTextList,
        };
      });

      await roleService.update({
        _id: role?._id,
        features,
      });

      handleClose();
      handleUpdate((prev) => !prev);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="roles-modal">
        {role &&
          role.features.length > 0 &&
          role.features.map((f) => (
            <ToggleRoles f={f} key={f.feature._id}></ToggleRoles>
          ))}
      </div>
      <Button type="submit" className="btn primary btn-login">
        Ok
      </Button>
    </form>
  );
};

export default AuthorizationForm;

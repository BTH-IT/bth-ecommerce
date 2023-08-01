'use client';

import Button from '@/components/Button';
import { RoleType } from '@/types/role';
import React, { FormEvent } from 'react';
import ToggleRoles from './ToggleRoles';
import roleService from '@/services/roleService';

const AuthorizationForm = ({
  handleClose,
  role,
  handleUpdate,
}: {
  handleClose: () => void;
  role: RoleType | null;
  handleUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nodeList = [...(e.target as any)];

    const features = role?.features.map((f) => {
      const actionNodeList = nodeList.filter(
        (node) =>
          node.name === f.feature.name &&
          node.checked &&
          node.dataset.action !== 'ALL',
      );

      const actionTextList = actionNodeList.map((node) => node.dataset.action);

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

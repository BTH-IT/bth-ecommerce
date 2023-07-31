'use client';

import InputForm from '@/app/(user)/(auth)/_components/InputForm';
import { useAppDispatch } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { handleRefreshToken } from '@/utils/clientActions';
import toast from 'react-hot-toast';
import Button from '@/components/Button';
import SelectForm from '@/app/(user)/(auth)/_components/SelectForm';
import accountService from '@/services/accountService';
import roleService from '@/services/roleService';
import { RoleType } from '@/types/role';
import { UserType } from '@/types/auth';
import userService from '@/services/userService';

export type AccountWithAvailableUserFormType = {
  email: string;
  password: string;
  role: string;
  user: string;
};

const schema = yup
  .object({
    email: yup
      .string()
      .email('This field must be an email')
      .required('This field is required'),
    password: yup.string().required('This field is required'),
    role: yup.string().required('This field is required'),
    user: yup.string().required('This field is required'),
  })
  .required();

const CreateAccountWithAvailableUserForm = ({
  handleClose,
}: {
  handleClose: () => void;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPass, setShowPass] = useState(false);
  const [roleList, setRoleList] = useState<RoleType[]>([]);
  const [userList, setUserList] = useState<UserType[]>([]);

  const {
    reset,
    handleSubmit,
    formState: { isValid, isLoading },
    control,
  } = useForm<AccountWithAvailableUserFormType>({
    defaultValues: {
      email: '',
      password: '',
      role: '',
      user: '',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data: AccountWithAvailableUserFormType) => {
    if (!isValid) return;

    try {
      const success = await handleRefreshToken(dispatch);

      if (success) {
        await accountService.addAccountWithAvailableUser(data);
        toast.success('Create account successfully');
      } else {
        router.replace('/login');
      }
      reset();
      handleClose();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    async function fetchRoleAndUserList() {
      try {
        await handleRefreshToken(dispatch);

        const resRole = await roleService.getAll();
        const resUser = await userService.getAll();

        setRoleList(resRole);
        setUserList(resUser);
      } catch (error: any) {
        console.log(error.message);
      }
    }

    fetchRoleAndUserList();
  }, []);

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <InputForm
        control={control}
        name="email"
        title="Email"
        placeholder="Nhập email..."
        type="text"
      ></InputForm>

      <InputForm
        control={control}
        name="password"
        type={showPass ? 'text' : 'password'}
        title="Password"
        placeholder="Nhập password..."
        icon={
          showPass ? (
            <i className="bi bi-eye"></i>
          ) : (
            <i className="bi bi-eye-slash"></i>
          )
        }
        iconActionClick={() => setShowPass(!showPass)}
      ></InputForm>
      <SelectForm control={control} name="role" title="Role">
        <option value="" hidden>
          Chọn role
        </option>
        {roleList.length > 0 &&
          roleList.map((role) => (
            <option value={role._id} key={role._id}>
              {role.name}
            </option>
          ))}
      </SelectForm>
      <SelectForm control={control} name="user" title="User">
        <option value="" hidden>
          Chọn user
        </option>
        {userList.length > 0 &&
          userList.map((user) => (
            <option value={user._id} key={user._id}>
              {user.fullname}
            </option>
          ))}
      </SelectForm>

      <Button
        type="submit"
        className="btn primary btn-login"
        disabled={isLoading}
      >
        Ok
      </Button>
    </form>
  );
};

export default CreateAccountWithAvailableUserForm;

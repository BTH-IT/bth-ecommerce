'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useEffect, useState } from 'react';
import InputForm from '../../(auth)/_components/InputForm';
import Button from '@/components/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { ChangePasswordFormType } from '@/types/form';
import { handleRefreshToken } from '@/utils/clientActions';
import toast from 'react-hot-toast';
import { authActions, selectAuth } from '@/redux/features/authSlice';
import authService from '@/services/authService';
import { useRouter } from 'next/navigation';

const schema = yup
  .object({
    oldPassword: yup.string().required('This field is required'),
    newPassword: yup.string().required('This field is required'),
    confirmNewPassword: yup
      .string()
      .required('This field is required')
      .oneOf([yup.ref('newPassword')], 'Passwords must match'),
  })
  .required();

const ChangePasswordForm = () => {
  const account: any = useAppSelector(selectAuth).newAccount;
  const loginSuccess = Boolean(
    useAppSelector((state) => state.auth.accessToken),
  );
  const router = useRouter();

  useEffect(() => {
    if (!loginSuccess) {
      router.push('/');
    }
  }, [loginSuccess]);
  const dispatch = useAppDispatch();
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmNewPass, setShowConfirmNewPass] = useState(false);

  const {
    reset,
    handleSubmit,
    formState: { isValid },
    control,
  } = useForm<ChangePasswordFormType>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const handleChangePassword = async (values: ChangePasswordFormType) => {
    if (!isValid || !account.email) return;

    const { confirmNewPassword, ...data } = values;
    const newData = {
      ...data,
      email: account.email,
    };

    try {
      await handleRefreshToken(dispatch);

      await authService.changePassword(newData);

      toast.success('Change password successfully!!');

      reset();
    } catch (error: any) {
      toast.error(error.response.data.message);
      if (error.response.data.statusCode === 401) {
        dispatch(authActions.logout());
      }
    }
  };
  return (
    <form className="form" onSubmit={handleSubmit(handleChangePassword)}>
      <InputForm
        control={control}
        name="oldPassword"
        title="Old Password"
        placeholder="Nhập mật khẩu cũ...."
        type={showOldPass ? 'text' : 'password'}
        icon={
          showOldPass ? (
            <i className="bi bi-eye"></i>
          ) : (
            <i className="bi bi-eye-slash"></i>
          )
        }
        iconActionClick={() => setShowOldPass(!showOldPass)}
      ></InputForm>
      <InputForm
        control={control}
        name="newPassword"
        title="New Password"
        placeholder="Nhập mật khẩu mới...."
        type={showNewPass ? 'text' : 'password'}
        icon={
          showNewPass ? (
            <i className="bi bi-eye"></i>
          ) : (
            <i className="bi bi-eye-slash"></i>
          )
        }
        iconActionClick={() => setShowNewPass(!showNewPass)}
      ></InputForm>
      <InputForm
        control={control}
        name="confirmNewPassword"
        title="Confirm New Password"
        placeholder="Nhập xác nhận mật khẩu mới...."
        type={showConfirmNewPass ? 'text' : 'password'}
        icon={
          showConfirmNewPass ? (
            <i className="bi bi-eye"></i>
          ) : (
            <i className="bi bi-eye-slash"></i>
          )
        }
        iconActionClick={() => setShowConfirmNewPass(!showConfirmNewPass)}
      ></InputForm>
      <Button type="submit" className="btn primary btn-update">
        Cập nhật
      </Button>
    </form>
  );
};

export default ChangePasswordForm;

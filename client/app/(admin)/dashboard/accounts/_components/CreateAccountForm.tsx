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
import authService from '@/services/authService';

export type AccountFormType = {
  fullname: string;
  gender: string;
  phone: string;
  address: string;
  birthYear: number;
  email: string;
  password: string;
};

const yearNow = new Date().getFullYear();

const schema = yup
  .object({
    fullname: yup.string().required('This field is required'),
    gender: yup
      .string()
      .required('This field is required')
      .oneOf(
        ['Nam', 'Nữ', 'Khác'],
        'This field must be equal to one of Nam, Nữ, Khác',
      ),
    phone: yup
      .string()
      .required('This field is required')
      .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, 'Phone number is not valid'),
    address: yup.string().required('This field is required'),
    birthYear: yup
      .number()
      .typeError('This field must be a number')
      .required('This field is required')
      .min(yearNow - 200, 'This field must be greater than ' + (yearNow - 200))
      .max(yearNow, 'This field must be less than ' + yearNow),
    email: yup
      .string()
      .email('This field must be an email')
      .required('This field is required'),
    password: yup.string().required('This field is required'),
  })
  .required();

const CreateAccountForm = ({ handleClose }: { handleClose: () => void }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPass, setShowPass] = useState(false);

  const {
    reset,
    handleSubmit,
    formState: { isValid, isLoading },
    control,
  } = useForm<AccountFormType>({
    defaultValues: {
      fullname: '',
      gender: '',
      phone: '',
      address: '',
      birthYear: 1,
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data: AccountFormType) => {
    if (!isValid) return;

    try {
      const success = await handleRefreshToken(dispatch);

      if (success) {
        await authService.register(data);
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

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <InputForm
        control={control}
        name="fullname"
        title="Fullname"
        placeholder="Nhập fullname..."
        type="text"
      ></InputForm>
      <SelectForm control={control} name="gender" title="Gender">
        <option value="" hidden>
          Chọn gender
        </option>
        <option value="Nam">Nam</option>
        <option value="Nữ">Nữ</option>
        <option value="Khác">Khác</option>
      </SelectForm>
      <InputForm
        control={control}
        name="phone"
        title="Phone number"
        placeholder="Nhập phone..."
        type="text"
      ></InputForm>
      <InputForm
        control={control}
        name="address"
        title="Address"
        placeholder="Nhập address..."
        type="text"
      ></InputForm>
      <InputForm
        control={control}
        name="birthYear"
        title="Birth Year"
        placeholder="Nhập birth year..."
        type="number"
      ></InputForm>
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

export default CreateAccountForm;

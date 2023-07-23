'use client';
import InputForm from './InputForm';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { RegisterFormType } from '@/types/form';
import Link from 'next/link';
import Button from '@/components/Button';
import Image from 'next/image';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import authService from '@/services/authService';
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import SelectForm from './SelectForm';
import toast from 'react-hot-toast';

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
    confirmPassword: yup
      .string()
      .required('This field is required')
      .oneOf([yup.ref('password')], 'Passwords must match'),
  })
  .required();

const RegisterForm = () => {
  const loginSuccess = Boolean(
    useAppSelector((state) => state.auth.accessToken),
  );
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (loginSuccess) {
      router.push('/');
    }
  }, [loginSuccess]);

  const {
    handleSubmit,
    formState: { isValid },
    control,
  } = useForm<RegisterFormType>({
    defaultValues: {
      fullname: '',
      gender: '',
      phone: '',
      address: '',
      birthYear: 1,
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const onSubmit = async (data: RegisterFormType) => {
    if (!isValid) return;

    try {
      await authService.register(data);

      router.push('/login');
    } catch (error: any) {
      toast.error(error.response.data.message);
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
      <InputForm
        control={control}
        name="confirmPassword"
        type={showConfirmPass ? 'text' : 'password'}
        title="Confirm Password"
        placeholder="Nhập confirm password..."
        icon={
          showConfirmPass ? (
            <i className="bi bi-eye"></i>
          ) : (
            <i className="bi bi-eye-slash"></i>
          )
        }
        iconActionClick={() => setShowConfirmPass(!showConfirmPass)}
      ></InputForm>

      <Button type="submit" className="btn primary btn-login">
        Đăng kí
      </Button>
      <div className="flex flex-col items-center justify-center mt-8 text-2xl">
        <p>Đăng nhập nhanh với</p>
        <Link href={'http://localhost:5000/auth/google'}>
          <Image
            src="/login-google.png"
            alt="login google"
            width={300}
            height={5}
          ></Image>
        </Link>
      </div>
      <p className="mt-4 text-center have-account fs-6">
        Bạn đã có tài khoản? <Link href="/login">Đăng nhập</Link>
      </p>
    </form>
  );
};

export default RegisterForm;

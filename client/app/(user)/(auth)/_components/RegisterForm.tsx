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

const schema = yup
  .object({
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
  const router = useRouter();

  useEffect(() => {
    if (loginSuccess) {
      router.push('/');
    }
  }, [loginSuccess]);

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const {
    handleSubmit,
    formState: { isValid },
    control,
  } = useForm<RegisterFormType>({
    defaultValues: {
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

      if (loginSuccess) {
        router.push('/login');
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

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

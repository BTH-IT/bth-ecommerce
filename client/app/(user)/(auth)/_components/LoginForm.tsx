'use client';
import InputForm from './InputForm';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { LoginFormType } from '@/types/form';
import Link from 'next/link';
import Button from '@/components/Button';
import Image from 'next/image';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { authActions, selectAuth } from '@/redux/features/authSlice';
import { useAppSelector } from '@/redux/hooks';
import { useRouter, useSearchParams } from 'next/navigation';

const schema = yup
  .object({
    email: yup
      .string()
      .email('This field must be an email')
      .required('This field is required'),
    password: yup.string().required('This field is required'),
  })
  .required();

const LoginForm = () => {
  const searchParams = useSearchParams();

  const loginSuccess = Boolean(
    useAppSelector((state) => state.auth.accessToken),
  );
  const router = useRouter();

  useEffect(() => {
    if (loginSuccess) {
      router.replace('/');
    }
  }, [loginSuccess]);

  useEffect(() => {
    if (searchParams.get('data')) {
      const data = JSON.parse(searchParams.get('data') || '{}');

      if (data.newAccount && data.user) {
        dispatch(
          authActions.login({
            email: data.newAccount.email,
            password:
              data.newAccount.email.split('').reverse().join('') +
              data.user.fullname.split('').reverse().join(''),
            type: 'google',
          }),
        );
      }
    }
  }, [searchParams.get('data')]);

  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { isValid },
    control,
  } = useForm<{
    email: string;
    password: string;
  }>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const onSubmit = async (data: { email: string; password: string }) => {
    if (!isValid) return;

    dispatch(
      authActions.login({
        ...data,
        type: 'default',
      }),
    );
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

      <Button type="submit" className="btn primary btn-login">
        Đăng nhập
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
        Chưa có tài khoản? <Link href="/register">Đăng kí</Link>
      </p>
    </form>
  );
};

export default LoginForm;

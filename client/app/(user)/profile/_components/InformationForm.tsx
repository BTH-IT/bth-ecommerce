'use client';

import { selectAuth } from '@/redux/features/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import authService from '@/services/authService';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import InputForm from '../../(auth)/_components/InputForm';
import SelectForm from '../../(auth)/_components/SelectForm';
import Button from '@/components/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { InformationFormType } from '@/types/form';
import AvatarInput from './AvatarInput';
import { handleRefreshToken } from '@/utils/clientActions';
import uploadService from '@/services/uploadService';

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
    avatar: yup.mixed().required('This field is required'),
  })
  .required();

const InformationForm = () => {
  const accessToken = useAppSelector(selectAuth).accessToken;
  const dispatch = useAppDispatch();
  const [data, setData] = useState<any>(null);

  const {
    setValue,
    handleSubmit,
    formState: { isValid },
    control,
  } = useForm<InformationFormType>({
    defaultValues: {
      fullname: data?.user?.fullname || '',
      gender: data?.user?.gender || '',
      phone: data?.user?.phone || '',
      address: data?.user?.address || '',
      birthYear: data?.user?.birthYear || 1,
      email: data?.account?.email || '',
      avatar: data?.account?.picture || '',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        let res = null;
        try {
          res = await authService.getProfile(accessToken);
        } catch (error: any) {
          if (error.response.data.statusCode === 401) {
            handleRefreshToken(dispatch);
          }
        }

        if (!res) {
          throw new Error('Error Server');
        }

        setData(res.data);
        setValue('email', res.data.account?.email);
        setValue('fullname', res.data.user?.fullname);
        setValue('gender', res.data.user?.gender);
        setValue('phone', res.data.user?.phone);
        setValue('address', res.data.user?.address);
        setValue('birthYear', res.data.user?.birthYear);
        setValue('avatar', res.data.account?.picture);
      } catch (error: any) {
        console.log(error);
      }
    }

    fetchProfile();
  }, [accessToken]);

  const updateInformation = async (values: InformationFormType) => {
    if (!isValid || !data) return;

    try {
      const fileUpload = values.avatar;

      const imageUrl = await uploadService.add(fileUpload);
    } catch (error: any) {}
  };

  return (
    <form className="form" onSubmit={handleSubmit(updateInformation)}>
      <AvatarInput
        name="avatar"
        setValue={setValue}
        control={control}
        accept="image/*"
        hidden
      ></AvatarInput>
      <InputForm
        control={control}
        name="email"
        title="Email"
        type="text"
      ></InputForm>
      <InputForm
        control={control}
        name="fullname"
        title="Họ tên"
        type="text"
      ></InputForm>
      <InputForm
        control={control}
        name="birthYear"
        title="Năm sinh"
        type="number"
      ></InputForm>
      <InputForm
        control={control}
        name="phone"
        title="Số điện thoại"
        type="text"
      ></InputForm>
      <InputForm
        control={control}
        name="address"
        title="Địa chỉ"
        type="text"
      ></InputForm>
      <SelectForm
        control={control}
        name="gender"
        title="Giới tính"
      ></SelectForm>
      <Button type="submit" className="btn primary btn-update">
        Cập nhật
      </Button>
    </form>
  );
};

export default InformationForm;

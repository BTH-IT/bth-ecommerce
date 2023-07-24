'use client';

import { authActions, selectAuth } from '@/redux/features/authSlice';
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
import userService from '@/services/userService';
import accountService from '@/services/accountService';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

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
  const loginSuccess = Boolean(
    useAppSelector((state) => state.auth.accessToken),
  );
  const loggedIn = useAppSelector((state) => state.auth.loggedIn);
  const router = useRouter();

  useLayoutEffect(() => {
    async function fetchProfile() {
      try {
        let res;
        try {
          res = await authService.getProfile(accessToken);
        } catch (error: any) {
          if (error.response.data.statusCode === 401) {
            await handleRefreshToken(dispatch);
            res = await authService.getProfile(accessToken);
          }
        }
        if (!res) throw new Error('Error server');

        setData(res.data);
        setUrl(res.data.account?.picture);
        setFocus('email');
        setValue('email', res.data.account?.email);
        setValue('fullname', res.data.user?.fullname);
        setValue('gender', res.data.user?.gender);
        setValue('phone', res.data.user?.phone);
        setValue('address', res.data.user?.address);
        setValue('birthYear', res.data.user?.birthYear);
      } catch (error: any) {
        if (error.response.data.statusCode === 401) {
          await handleRefreshToken(dispatch);
          await fetchProfile();
        }
      }
    }

    if (!loginSuccess || !loggedIn) {
      router.push('/');
    } else {
      fetchProfile();
    }
  }, [loginSuccess, loggedIn]);
  const dispatch = useAppDispatch();
  const [data, setData] = useState<any>(null);
  const [url, setUrl] = useState<any>('');

  const {
    setValue,
    handleSubmit,
    setFocus,
    formState: { isValid },
    control,
  } = useForm<InformationFormType>({
    defaultValues: {
      fullname: '',
      gender: '',
      phone: '',
      address: '',
      birthYear: 1,
      email: '',
      avatar: '',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const updateInformation = async (values: InformationFormType) => {
    if (!isValid || !data) return;

    try {
      const { avatar, email, ...restValues }: InformationFormType = values;

      const { data: avatarData } = await uploadService.uploadSingle(avatar);

      const account = {
        picture: avatarData.imageUrl || data.account.picture,
        email,
        _id: data.account._id,
      };

      const user = {
        ...restValues,
        _id: data.user._id,
      };

      await userService.update(user);
      await accountService.update(account);

      const res = await authService.getProfile(accessToken);

      dispatch(authActions.updateAccount({ account: res.data.account }));
      dispatch(authActions.updateUser({ user: res.data.user }));

      localStorage.setItem('current_account', JSON.stringify(account));
      localStorage.setItem('current_account', JSON.stringify(user));

      toast.success("Change user's information successfully!!");
    } catch (error: any) {
      if (error.statusCode === 403) {
        await handleRefreshToken(dispatch);
        await updateInformation(values);
      } else {
        toast.error("Change user's information failure!!");
      }
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(updateInformation)}>
      <AvatarInput
        name="avatar"
        setValue={setValue}
        control={control}
        url={url}
        image={url}
        setImage={setUrl}
        accept="image/*"
        hidden
      ></AvatarInput>
      <InputForm
        control={control}
        name="email"
        title="Email"
        type="text"
        placeholder="Nhập email...."
      ></InputForm>
      <InputForm
        control={control}
        name="fullname"
        title="Họ tên"
        type="text"
        placeholder="Nhập họ tên...."
      ></InputForm>
      <InputForm
        control={control}
        name="birthYear"
        title="Năm sinh"
        type="number"
        placeholder="Nhập năm sinh...."
      ></InputForm>
      <InputForm
        control={control}
        name="phone"
        title="Số điện thoại"
        type="text"
        placeholder="Nhập số điện thoại...."
      ></InputForm>
      <InputForm
        control={control}
        name="address"
        title="Địa chỉ"
        type="text"
        placeholder="Nhập địa chỉ...."
      ></InputForm>
      <SelectForm control={control} name="gender" title="Giới tính">
        <option value="" hidden>
          Chọn gender
        </option>
        <option value="Nam">Nam</option>
        <option value="Nữ">Nữ</option>
        <option value="Khác">Khác</option>
      </SelectForm>
      <Button type="submit" className="btn primary btn-update">
        Cập nhật
      </Button>
    </form>
  );
};

export default InformationForm;

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
import uploadService from '@/services/uploadService';
import ImageForm from '../../brands/_components/ImageForm';
import SelectForm from '@/app/(user)/(auth)/_components/SelectForm';
import { RoleType } from '@/types/role';
import roleService from '@/services/roleService';
import { AccountType } from '@/types/account';
import AvatarInput from '@/app/(user)/profile/_components/AvatarInput';
import accountService from '@/services/accountService';

type AccountFormType = {
  email: string;
  role: string;
  picture: any;
};

const schema = yup
  .object({
    email: yup.string().required('This field is required'),
    role: yup.string().required('This field is required'),
    picture: yup.mixed().required('This field is required'),
  })
  .required();

const UpdateAccountForm = ({
  account,
  handleClose,
}: {
  account: AccountType;
  handleClose: () => void;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [picture, setPicture] = useState<any>(null);
  const [roleList, setRoleList] = useState<RoleType[]>([]);

  useEffect(() => {
    setValue('email', account.email);
    setValue('role', account.role._id);
    setPicture(account.picture);
  }, []);

  useEffect(() => {
    async function fetchRoleList() {
      try {
        await handleRefreshToken(dispatch);

        const res = await roleService.getAll();

        setRoleList(res);
      } catch (error: any) {
        console.log(error.message);
      }
    }

    fetchRoleList();
  }, []);

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isValid, isLoading },
    control,
  } = useForm<AccountFormType>({
    defaultValues: {
      email: '',
      role: '',
      picture: '',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data: AccountFormType) => {
    if (!isValid) return;

    try {
      const success = await handleRefreshToken(dispatch);

      if (success) {
        let thumbUrlData: any = null;

        if (typeof data.picture === 'object') {
          thumbUrlData = await uploadService.uploadSingle(data.picture);
        }

        await accountService.update({
          _id: account._id,
          ...data,
          picture: thumbUrlData ? thumbUrlData.secureUrl : data.picture,
        });
        toast.success('Update account successfully');
      } else {
        router.replace('/login');
      }
      handleClose();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <AvatarInput
        name="picture"
        setValue={setValue}
        control={control}
        url={picture}
        image={picture}
        setImage={setPicture}
        accept="image/*"
        hidden
      ></AvatarInput>
      <InputForm
        control={control}
        name="email"
        title="Email"
        placeholder="Nhập email..."
        type="text"
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
      <Button type="submit" className="primary" disabled={isLoading}>
        Ok
      </Button>
    </form>
  );
};

export default UpdateAccountForm;

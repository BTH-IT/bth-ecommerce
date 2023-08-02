import InputForm from '@/app/(user)/(auth)/_components/InputForm';
import Button from '@/components/Button';
import { UserGenreType } from '@/types/user-type';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { handleRefreshToken } from '@/utils/clientActions';
import userTypeService from '@/services/userTypeService';

export type UserTypeFormType = {
  name: string;
};

const schema = yup
  .object({
    name: yup.string().required('This field is required'),
  })
  .required();

const UserTypeForm = ({
  add,
  handleClose,
  userType = null,
}: {
  add: boolean;
  handleClose: () => void;
  userType?: UserGenreType | null;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (add) {
      reset();
    } else if (userType) {
      setValue('name', userType.name);
    }
  }, []);

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isValid, isLoading },
    control,
  } = useForm<UserTypeFormType>({
    defaultValues: {
      name: '',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data: UserTypeFormType) => {
    if (!isValid) return;

    try {
      const success = await handleRefreshToken(dispatch);

      if (success) {
        if (add) {
          await userTypeService.add(data);

          toast.success('Add user type successfully');
        } else if (userType) {
          await userTypeService.update({
            _id: userType._id,
            ...data,
          });

          toast.success('Update user type successfully');
        }
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
      <InputForm
        control={control}
        name="name"
        title="Name"
        placeholder="Nhập name..."
        type="text"
      ></InputForm>
      <Button type="submit" className="primary" disabled={isLoading}>
        Ok
      </Button>
    </form>
  );
};

export default UserTypeForm;

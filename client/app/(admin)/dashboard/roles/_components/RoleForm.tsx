import { RoleType } from '@/types/role';
import React, { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { useForm } from 'react-hook-form';
import { handleRefreshToken } from '@/utils/clientActions';
import roleService from '@/services/roleService';
import toast from 'react-hot-toast';
import InputForm from '@/app/(user)/(auth)/_components/InputForm';
import Button from '@/components/Button';

export type RoleFormType = {
  name: string;
  description: string;
};

const schema = yup
  .object({
    name: yup.string().required('This field is required'),
    description: yup.string().required('This field is required'),
  })
  .required();

const RoleForm = ({
  add,
  handleClose,
  role = null,
}: {
  add: boolean;
  handleClose: () => void;
  role: RoleType | null;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (add) {
      reset();
    } else if (role) {
      setValue('name', role.name);
      setValue('description', role.description);
    }
  }, []);

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isValid, isLoading },
    control,
  } = useForm<RoleFormType>({
    defaultValues: {
      name: '',
      description: '',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data: RoleFormType) => {
    if (!isValid) return;

    try {
      const success = await handleRefreshToken(dispatch);

      if (success) {
        if (add) {
          await roleService.add(data);

          toast.success('Add role successfully');
        } else if (role) {
          await roleService.update({
            _id: role._id,
            ...data,
          });

          toast.success('Update role successfully');
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
      <InputForm
        control={control}
        name="description"
        title="Description"
        placeholder="Nhập description..."
        type="text"
      ></InputForm>
      <Button type="submit" className="primary" disabled={isLoading}>
        Ok
      </Button>
    </form>
  );
};

export default RoleForm;

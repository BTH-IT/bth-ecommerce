'use client';

import InputForm from '@/app/(user)/(auth)/_components/InputForm';
import { useAppDispatch } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { handleRefreshToken } from '@/utils/clientActions';
import toast from 'react-hot-toast';
import Button from '@/components/Button';
import { FeatureType } from '@/types/feature';
import featureService from '@/services/featureService';

type FeatureFormType = {
  name: string;
};

const schema = yup
  .object({
    name: yup.string().required('This field is required'),
  })
  .required();

const FeatureForm = ({
  add,
  feature = null,
  handleClose,
}: {
  add: boolean;
  feature?: FeatureType | null;
  handleClose: () => void;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (add) {
      reset();
    } else if (feature) {
      setValue('name', feature.name);
    }
  }, [add, feature]);

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isValid, isLoading },
    control,
  } = useForm<FeatureFormType>({
    defaultValues: {
      name: '',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data: FeatureFormType) => {
    if (!isValid) return;

    try {
      const success = await handleRefreshToken(dispatch);

      if (success) {
        if (add) {
          await featureService.add({
            ...data,
          });

          toast.success('Add feature successfully');
        } else {
          await featureService.update({
            ...data,
          });

          toast.success('Update feature successfully');
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

export default FeatureForm;

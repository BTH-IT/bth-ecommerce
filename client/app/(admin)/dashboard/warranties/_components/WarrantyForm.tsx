'use client';

import { WarrantyType } from '@/types/warranty';
import React, { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { useForm } from 'react-hook-form';
import { handleRefreshToken } from '@/utils/clientActions';
import toast from 'react-hot-toast';
import warrantyService from '@/services/warrantyService';
import InputForm from '@/app/(user)/(auth)/_components/InputForm';
import Button from '@/components/Button';

export type WarrantyFormType = {
  warrantyYear: number;
};

const schema = yup
  .object({
    warrantyYear: yup
      .number()
      .min(0, 'This field must be greater than or equal to 0')
      .required('This field is required'),
  })
  .required();

const WarrantyForm = ({
  handleClose,
  warranty = null,
}: {
  handleClose: () => void;
  warranty?: WarrantyType | null;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (warranty) {
      setValue('warrantyYear', warranty.warrantyYear);
    }
  }, []);

  const {
    setValue,
    handleSubmit,
    formState: { isValid, isLoading },
    control,
  } = useForm<WarrantyFormType>({
    defaultValues: {
      warrantyYear: 0,
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data: WarrantyFormType) => {
    if (!isValid) return;

    try {
      const success = await handleRefreshToken(dispatch);

      if (success) {
        if (warranty) {
          await warrantyService.update({
            _id: warranty._id,
            ...data,
          });

          toast.success('Update warranty successfully');
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
        name="warrantyYear"
        title="Warranty Year"
        placeholder="Nhập warranty year..."
        type="text"
      ></InputForm>
      <Button type="submit" className="primary" disabled={isLoading}>
        Ok
      </Button>
    </form>
  );
};

export default WarrantyForm;

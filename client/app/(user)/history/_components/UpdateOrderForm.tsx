'use client';

import React, { useEffect } from 'react';
import InputForm from '../../(auth)/_components/InputForm';
import { OrderType } from '@/types/order';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { OrderFormType } from '@/types/form';
import Button from '@/components/Button';
import { handleRefreshToken } from '@/utils/clientActions';
import { useAppDispatch } from '@/redux/hooks';
import { authActions } from '@/redux/features/authSlice';
import toast from 'react-hot-toast';
import orderService from '@/services/orderService';
import { useRouter } from 'next/navigation';

const schema = yup
  .object({
    phone: yup
      .string()
      .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, 'Phone number is not valid')
      .required('This field is required'),
    address: yup.string().required('This field is required'),
    fullname: yup.string().required('This field is required'),
  })
  .required();

const UpdateOrderForm = ({
  order,
  handleClose,
}: {
  order: OrderType;
  handleClose: () => void;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    setValue('phone', order.phone);
    setValue('address', order.address);
    setValue('fullname', order.fullname);
  }, []);

  const {
    setValue,
    handleSubmit,
    formState: { isValid, isLoading },
    control,
  } = useForm<OrderFormType>({
    defaultValues: {
      phone: '',
      address: '',
      fullname: '',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data: OrderFormType) => {
    if (!isValid) return;

    try {
      const success = await handleRefreshToken(dispatch);

      if (success) {
        await orderService.update({
          _id: order._id,
          ...data,
        });

        toast.success('Update order successfully');
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
        name="phone"
        title="Phone"
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
        name="fullname"
        title="Fullname"
        placeholder="Nhập fullname..."
        type="text"
      ></InputForm>
      <Button type="submit" className="primary" disabled={isLoading}>
        Ok
      </Button>
    </form>
  );
};

export default UpdateOrderForm;

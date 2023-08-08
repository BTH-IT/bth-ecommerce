'use client';

import React, { useEffect } from 'react';
import { OrderType } from '@/types/order';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import Button from '@/components/Button';
import { handleRefreshToken } from '@/utils/clientActions';
import { useAppDispatch } from '@/redux/hooks';
import toast from 'react-hot-toast';
import orderService from '@/services/orderService';
import { useRouter } from 'next/navigation';
import SelectForm from '@/app/(user)/(auth)/_components/SelectForm';

const schema = yup
  .object({
    status: yup.string().required('This field is required'),
  })
  .required();

const UpdateOrderStatusForm = ({
  order,
  handleClose,
}: {
  order: OrderType;
  handleClose: () => void;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    setValue('status', order.status);
  }, []);

  const {
    setValue,
    handleSubmit,
    formState: { isValid, isLoading },
    control,
  } = useForm<{ status: string }>({
    defaultValues: {
      status: '',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data: { status: string }) => {
    if (!isValid) return;

    if (data.status === 'done' && !order.isPaid) {
      handleClose();
      toast.error('Unpaid Order');
      return;
    }

    try {
      const success = await handleRefreshToken(dispatch);

      if (success) {
        await orderService.update({
          _id: order._id,
          user: order.user._id,
          ...data,
        });

        toast.success('Update order successfully');
        router.refresh();
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
      <SelectForm
        control={control}
        name="status"
        title="Thay đổi trạng thái đơn hàng"
      >
        <option value="" hidden>
          Thay đổi trạng thái đơn hàng
        </option>
        <option value="waiting">Waiting</option>
        <option value="shipping">Shipping</option>
        <option value="done">Done</option>
        <option value="canceled">Canceled</option>
      </SelectForm>
      <Button type="submit" className="primary" disabled={isLoading}>
        Ok
      </Button>
    </form>
  );
};

export default UpdateOrderStatusForm;

'use client';

import React, { useEffect } from 'react';
import InputForm from '../../(auth)/_components/InputForm';
import { OrderType } from '@/types/order';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { OrderFormType } from '@/types/form';
import SelectForm from '../../(auth)/_components/SelectForm';
import Button from '@/components/Button';

const schema = yup
  .object({
    phone: yup
      .string()
      .email('This field must be an email')
      .required('This field is required'),
    address: yup.string().required('This field is required'),
    status: yup.string().required('This field is required'),
  })
  .required();

const UpdateOrderForm = ({
  order,
  handleClose,
}: {
  order: OrderType;
  handleClose: () => void;
}) => {
  useEffect(() => {
    setValue('phone', order.phone);
    setValue('address', order.address);
    setValue('status', order.status);
  }, []);

  const {
    setValue,
    handleSubmit,
    formState: { isValid },
    control,
  } = useForm<OrderFormType>({
    defaultValues: {
      phone: '',
      address: '',
      status: '',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const onSubmit = async (data: OrderFormType) => {
    if (!isValid) return;
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
      <SelectForm
        control={control}
        name="status"
        title="Trạng thái"
        defaultValue={order.status}
      >
        <option value="" hidden>
          Chọn status
        </option>
        <option value="waiting">Waiting</option>
        <option value="shipping">Shipping</option>
        <option value="done">Done</option>
        <option value="canceled">Canceled</option>
      </SelectForm>
      <Button type="submit" className="primary">
        Ok
      </Button>
    </form>
  );
};

export default UpdateOrderForm;

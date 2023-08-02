import { RoleType } from '@/types/role';
import React, { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { useForm } from 'react-hook-form';
import { handleRefreshToken } from '@/utils/clientActions';
import toast from 'react-hot-toast';
import InputForm from '@/app/(user)/(auth)/_components/InputForm';
import Button from '@/components/Button';
import { SupplierType } from '@/types/supplier';
import supplierService from '@/services/supplierService';

export type SupplierFormType = {
  name: string;
  phoneNum: string;
  address: string;
};

const schema = yup
  .object({
    name: yup.string().required('This field is required'),
    phoneNum: yup
      .string()
      .required('This field is required')
      .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, 'Phone number is not valid'),
    address: yup.string().required('This field is required'),
  })
  .required();

const SupplierForm = ({
  add,
  handleClose,
  supplier = null,
}: {
  add: boolean;
  handleClose: () => void;
  supplier: SupplierType | null;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (add) {
      reset();
    } else if (supplier) {
      setValue('name', supplier.name);
      setValue('phoneNum', supplier.phoneNum);
      setValue('address', supplier.address);
    }
  }, []);

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isValid, isLoading },
    control,
  } = useForm<SupplierFormType>({
    defaultValues: {
      name: '',
      phoneNum: '',
      address: '',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data: SupplierFormType) => {
    if (!isValid) return;

    try {
      const success = await handleRefreshToken(dispatch);

      if (success) {
        if (add) {
          await supplierService.add(data);

          toast.success('Add supplier successfully');
        } else if (supplier) {
          await supplierService.update({
            _id: supplier._id,
            ...data,
          });

          toast.success('Update supplier successfully');
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
        name="phoneNum"
        title="Phone number"
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
      <Button type="submit" className="primary" disabled={isLoading}>
        Ok
      </Button>
    </form>
  );
};

export default SupplierForm;

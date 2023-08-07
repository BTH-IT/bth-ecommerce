import Button from '@/components/Button';
import { UserType } from '@/types/auth';
import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import userService from '@/services/userService';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { handleRefreshToken } from '@/utils/clientActions';
import toast from 'react-hot-toast';
import InputForm from '@/app/(user)/(auth)/_components/InputForm';
import SelectForm from '@/app/(user)/(auth)/_components/SelectForm';
import userTypeService from '@/services/userTypeService';
import { UserGenreType } from '@/types/user-type';

export type UserFormType = {
  fullname: string;
  gender: string;
  phone: string;
  address: string;
  type: string;
  birthYear: number;
};

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
    type: yup.string().required('This field is required'),
  })
  .required();

const UserForm = ({
  add,
  handleClose,
  user = null,
}: {
  add: boolean;
  handleClose: () => void;
  user?: UserType | null;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [userTypeList, setUserTypeList] = useState<UserGenreType[]>([]);

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isValid, isLoading },
    control,
  } = useForm<UserFormType>({
    defaultValues: {
      fullname: '',
      gender: '',
      phone: '',
      address: '',
      birthYear: 1,
      type: '',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (add) {
      reset();
    } else if (user) {
      setValue('fullname', user.fullname);
      setValue('gender', user.gender);
      setValue('phone', user.phone);
      setValue('address', user.address);
      setValue('birthYear', user.birthYear);
      setValue('type', user.type._id);
    }
  }, []);

  useEffect(() => {
    async function fetchUserTypeList() {
      try {
        await handleRefreshToken(dispatch);

        const res = await userTypeService.getAll();

        setUserTypeList(res);
      } catch (error: any) {
        console.log(error.message);
      }
    }

    fetchUserTypeList();
  }, []);

  const onSubmit = async (data: UserFormType) => {
    if (!isValid) return;

    try {
      await userService.add(data);

      const success = await handleRefreshToken(dispatch);

      if (success) {
        if (add) {
          await userService.add(data);

          toast.success('Add user successfully');
        } else if (user) {
          await userService.update({
            _id: user._id,
            ...data,
          });

          toast.success('Update user successfully');
        }
        router.refresh();
      } else {
        router.replace('/login');
      }
      handleClose();
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <InputForm
        control={control}
        name="fullname"
        title="Fullname"
        placeholder="Nhập fullname..."
        type="text"
      ></InputForm>
      <SelectForm control={control} name="gender" title="Gender">
        <option value="" hidden>
          Chọn gender
        </option>
        <option value="Nam">Nam</option>
        <option value="Nữ">Nữ</option>
        <option value="Khác">Khác</option>
      </SelectForm>
      <SelectForm control={control} name="type" title="User Type">
        <option value="" hidden>
          Chọn type
        </option>
        {userTypeList.length > 0 &&
          userTypeList.map((userType) => (
            <option value={userType._id} key={userType._id}>
              {userType.name}
            </option>
          ))}
      </SelectForm>
      <InputForm
        control={control}
        name="phone"
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
      <InputForm
        control={control}
        name="birthYear"
        title="Birth Year"
        placeholder="Nhập birth year..."
        type="number"
      ></InputForm>

      <Button type="submit" className="primary" disabled={isLoading}>
        Ok
      </Button>
    </form>
  );
};

export default UserForm;

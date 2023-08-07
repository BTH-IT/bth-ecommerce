'use client';

import InputForm from '@/app/(user)/(auth)/_components/InputForm';
import { useAppDispatch } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { BrandType } from '@/types/brand';
import { handleRefreshToken } from '@/utils/clientActions';
import toast from 'react-hot-toast';
import Button from '@/components/Button';
import ImageForm from './ImageForm';
import brandService from '@/services/brandService';
import uploadService from '@/services/uploadService';

type BrandFormType = {
  name: string;
  thumbUrl: any;
  iconUrl: any;
};

const schema = yup
  .object({
    name: yup.string().required('This field is required'),
    thumbUrl: yup.mixed().required('This field is required'),
    iconUrl: yup.mixed().required('This field is required'),
  })
  .required();

const BrandForm = ({
  add,
  brand = null,
  handleClose,
}: {
  add: boolean;
  brand?: BrandType | null;
  handleClose: () => void;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [thumbUrl, setThumbUrl] = useState<any>(null);
  const [iconUrl, setIconUrl] = useState<any>('');

  useEffect(() => {
    if (add) {
      reset();
    } else if (brand) {
      setValue('name', brand.name);
      setThumbUrl(brand.thumbUrl);
      setIconUrl(brand.iconUrl);
    }
  }, [add, brand]);

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isValid, isLoading },
    control,
  } = useForm<BrandFormType>({
    defaultValues: {
      name: '',
      thumbUrl: '',
      iconUrl: '',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data: BrandFormType) => {
    if (!isValid) return;

    try {
      const success = await handleRefreshToken(dispatch);

      if (success) {
        if (add) {
          const { data: thumbUrlData } = await uploadService.uploadSingle(
            data.thumbUrl,
          );
          const { data: iconUrlData } = await uploadService.uploadSingle(
            data.iconUrl,
          );

          await brandService.add({
            ...data,
            thumbUrl: thumbUrlData.secureUrl,
            iconUrl: iconUrlData.secureUrl,
          });

          toast.success('Add brand successfully');
        } else {
          let thumbUrlData: any = null;
          let iconUrlData: any = null;

          if (typeof data.thumbUrl === 'object') {
            const res = await uploadService.uploadSingle(data.thumbUrl);
            thumbUrlData = res.data;
          }

          if (typeof data.iconUrl === 'object') {
            const res = await uploadService.uploadSingle(data.iconUrl);
            iconUrlData = res.data;
          }

          await brandService.update({
            _id: brand?._id,
            ...data,
            thumbUrl: thumbUrlData ? thumbUrlData.secureUrl : brand?.thumbUrl,
            iconUrl: iconUrlData ? iconUrlData.secureUrl : brand?.iconUrl,
          });

          toast.success('Update brand successfully');
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
      <ImageForm
        name="thumbUrl"
        setValue={setValue}
        control={control}
        url={thumbUrl}
        image={thumbUrl}
        setImage={setThumbUrl}
        title="Thumbnail"
        accept="image/*"
        hidden
      ></ImageForm>
      <ImageForm
        name="iconUrl"
        title="Icon"
        setValue={setValue}
        control={control}
        url={iconUrl}
        image={iconUrl}
        setImage={setIconUrl}
        accept="image/*"
        hidden
      ></ImageForm>
      <Button type="submit" className="primary" disabled={isLoading}>
        Ok
      </Button>
    </form>
  );
};

export default BrandForm;

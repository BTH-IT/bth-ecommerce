'use client';

import InputForm from '@/app/(user)/(auth)/_components/InputForm';
import { useAppDispatch } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { handleRefreshToken } from '@/utils/clientActions';
import toast from 'react-hot-toast';
import Button from '@/components/Button';
import uploadService from '@/services/uploadService';
import ImageForm from '../../brands/_components/ImageForm';
import { BannerType } from '@/types/banner';
import bannerService from '@/services/bannerService';

type BannerFormType = {
  name: string;
  thumbUrl: any;
  description?: any;
};

const schema = yup
  .object({
    name: yup.string().required('This field is required'),
    thumbUrl: yup.mixed().required('This field is required'),
  })
  .required();

const BannerForm = ({
  add,
  banner = null,
  handleClose,
}: {
  add: boolean;
  banner?: BannerType | null;
  handleClose: () => void;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [thumbUrl, setThumbUrl] = useState<any>(null);

  useEffect(() => {
    if (add) {
      reset();
    } else if (banner) {
      setValue('name', banner.name);
      setValue('description', banner.description);
      setThumbUrl(banner.thumbUrl);
    }
  }, [add, banner]);

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isValid, isLoading },
    control,
  } = useForm<BannerFormType>({
    defaultValues: {
      name: '',
      thumbUrl: '',
      description: '',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data: BannerFormType) => {
    if (!isValid) return;

    try {
      const success = await handleRefreshToken(dispatch);

      if (success) {
        if (add) {
          const { data: thumbUrlData } = await uploadService.uploadSingle(
            data.thumbUrl,
          );

          await bannerService.add({
            ...data,
            thumbUrl: thumbUrlData.secureUrl,
          });

          toast.success('Add brand successfully');
          router.refresh();
        } else {
          let thumbUrlData: any = null;

          if (typeof data.thumbUrl === 'object') {
            const res = await uploadService.uploadSingle(data.thumbUrl);
            thumbUrlData = res.data;
          }

          await bannerService.update({
            _id: banner?._id,
            ...data,
            thumbUrl: thumbUrlData ? thumbUrlData.secureUrl : banner?.thumbUrl,
          });

          toast.success('Update banner successfully');
          router.refresh();
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
      <Button type="submit" className="primary" disabled={isLoading}>
        Ok
      </Button>
    </form>
  );
};

export default BannerForm;

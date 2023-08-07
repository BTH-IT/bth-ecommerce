import InputForm from '@/app/(user)/(auth)/_components/InputForm';
import Button from '@/components/Button';
import { useAppDispatch } from '@/redux/hooks';
import { ProductType } from '@/types/product';
import { handleRefreshToken } from '@/utils/clientActions';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import productService from '@/services/productService';
import ImageListForm from './ImageListForm';
import SelectForm from '@/app/(user)/(auth)/_components/SelectForm';
import { BrandType } from '@/types/brand';
import CheckBoxForm from './CheckBoxForm';
import uploadService from '@/services/uploadService';

export type ProductFormType = {
  productName: string;
  imageUrlList: any[];
  warranteeYear: number;
  originPrice: number;
  salePercent: number | undefined;
  description: string | undefined;
  brand: string;
  generateCpu: string;
  cpu: string;
  seriesCpu: string;
  chip: string;
  ramName: string;
  ramSize: number;
  screen: string;
  storageName: string;
  storageSize: number;
  storagePortName: string;
  storagePortNum: number;
  storagePortMaximum: number;
  supportM2slotType: string;
  screenOutputPortName: string;
  screenOutputPortNum: number;
  bluetooth: string;
  keyboard: string;
  operationSystem: string;
  size: string;
  pin: number;
  weight: number;
  seriesLaptop: string;
  partNumber: string;
  color: string;
  accessoriesIncluded: string;
  led: boolean | undefined;
  touchScreen: boolean | undefined;
};

const schema = yup
  .object({
    productName: yup.string().required('This field is a required'),
    imageUrlList: yup
      .array()
      .max(5, 'Only 5 image are allowed')
      .required('This field is a required'),
    warranteeYear: yup
      .number()
      .label('This field is a required')
      .integer()
      .required('This field is a required'),
    originPrice: yup
      .number()
      .label('This field is a required')
      .integer()
      .required('This field is a required'),
    salePercent: yup.number().label('This field is a required').integer(),
    description: yup.string(),
    brand: yup.string().required('This field is a required'),
    generateCpu: yup.string().required('This field is a required'),
    cpu: yup.string().required('This field is a required'),
    seriesCpu: yup.string().required('This field is a required'),
    chip: yup.string().required('This field is a required'),
    ramName: yup.string().required('This field is a required'),
    ramSize: yup
      .number()
      .label('This field is a required')
      .integer()
      .required('This field is a required'),
    screen: yup.string().required('This field is a required'),
    storageName: yup.string().required('This field is a required'),
    storageSize: yup
      .number()
      .label('This field is a required')
      .integer()
      .required('This field is a required'),
    storagePortName: yup.string().required('This field is a required'),
    storagePortNum: yup
      .number()
      .label('This field is a required')
      .integer()
      .required('This field is a required'),
    storagePortMaximum: yup
      .number()
      .label('This field is a required')
      .integer()
      .required('This field is a required'),
    supportM2slotType: yup.string().required('This field is a required'),
    screenOutputPortName: yup.string().required('This field is a required'),
    screenOutputPortNum: yup
      .number()
      .label('This field is a required')
      .integer()
      .required('This field is a required'),
    bluetooth: yup.string().required('This field is a required'),
    keyboard: yup.string().required('This field is a required'),
    operationSystem: yup.string().required('This field is a required'),
    size: yup.string().required('This field is a required'),
    pin: yup
      .number()
      .label('This field is a required')
      .integer()
      .required('This field is a required'),
    weight: yup
      .number()
      .label('This field is a required')
      .integer()
      .required('This field is a required'),
    seriesLaptop: yup.string().required('This field is a required'),
    partNumber: yup.string().required('This field is a required'),
    color: yup.string().required('This field is a required'),
    accessoriesIncluded: yup.string().required('This field is a required'),
    led: yup.boolean().label('This field is a truthy type'),
    touchScreen: yup.boolean().label('This field is a truthy type'),
  })
  .required();

const ProductForm = ({
  add,
  handleClose,
  product = null,
  brandList,
}: {
  add: boolean;
  handleClose: () => void;
  product?: ProductType | null;
  brandList: BrandType[];
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [imageUrlList, setImageUrlList] = useState<string[]>([]);

  useEffect(() => {
    if (add) {
      reset();
    } else if (product) {
      setValue('productName', product.productName);
      setValue('warranteeYear', product.warranteeYear);
      setValue('originPrice', product.originPrice);
      setValue('salePercent', product.salePercent);
      setValue('description', product.description);
      setValue('generateCpu', product.generateCpu);
      setValue('cpu', product.cpu);
      setValue('seriesCpu', product.seriesCpu);
      setValue('chip', product.chip);
      setValue('ramName', product.ramName);
      setValue('ramSize', product.ramSize);
      setValue('screen', product.screen);
      setValue('storageName', product.storageName);
      setValue('storageSize', product.storageSize);
      setValue('storagePortName', product.storagePortName);
      setValue('storagePortNum', product.storagePortNum);
      setValue('storagePortMaximum', product.storagePortMaximum);
      setValue('supportM2slotType', product.supportM2slotType);
      setValue('screenOutputPortName', product.screenOutputPortName);
      setValue('screenOutputPortNum', product.screenOutputPortNum);
      setValue('bluetooth', product.bluetooth);
      setValue('keyboard', product.keyboard);
      setValue('operationSystem', product.operationSystem);
      setValue('keyboard', product.keyboard);
      setValue('operationSystem', product.operationSystem);
      setValue('size', product.size);
      setValue('pin', product.pin);
      setValue('weight', product.weight);
      setValue('seriesLaptop', product.seriesLaptop);
      setValue('partNumber', product.partNumber);
      setValue('color', product.color);
      setValue('accessoriesIncluded', product.accessoriesIncluded);
      setValue('led', product.led);
      setValue('touchScreen', product.touchScreen);
      setValue('brand', product.brand._id);
      setImageUrlList(product.imageUrlList);
    }
  }, [add, product]);

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isValid, isLoading },
    control,
  } = useForm<ProductFormType>({
    defaultValues: {
      productName: '',
      imageUrlList: [],
      warranteeYear: 0,
      originPrice: 0,
      salePercent: 0,
      description: '',
      brand: '',
      generateCpu: '',
      cpu: '',
      seriesCpu: '',
      chip: '',
      ramName: '',
      ramSize: 0,
      screen: '',
      storageName: '',
      storageSize: 0,
      storagePortName: '',
      storagePortNum: 0,
      storagePortMaximum: 0,
      supportM2slotType: '',
      screenOutputPortName: '',
      screenOutputPortNum: 0,
      bluetooth: '',
      keyboard: '',
      operationSystem: '',
      size: '',
      pin: 0,
      weight: 0,
      seriesLaptop: '',
      partNumber: '',
      color: '',
      accessoriesIncluded: '',
      led: false,
      touchScreen: false,
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data: ProductFormType) => {
    if (!isValid) return;

    try {
      const success = await handleRefreshToken(dispatch);

      if (success) {
        if (add) {
          if (data.imageUrlList.length > 0) {
            const { data: imageUrlDataList } =
              await uploadService.uploadMultiple(data.imageUrlList);

            await productService.add({
              ...data,
              imageUrlList: imageUrlDataList.map(
                (imageUrl: any) => imageUrl.secureUrl,
              ),
            });

            toast.success('Add product successfully');
          } else {
            toast.error('Image list is a required');
          }
        } else if (product) {
          let imageUrlDataList: any[] = [...product.imageUrlList];

          if (data.imageUrlList.length > 0) {
            const { data: list } = await uploadService.uploadMultiple(
              data.imageUrlList,
            );

            imageUrlDataList = [
              ...imageUrlDataList,
              ...list.map((item: any) => item.secureUrl),
            ];
          }

          if (imageUrlDataList.length > 5 || imageUrlDataList.length <= 0) {
            toast('Image list must be maximum 5 images and minimum 1 image!!');
            return;
          }

          await productService.update({
            _id: product._id,
            ...data,
            imageUrlList: imageUrlDataList,
          });

          toast.success('Update product successfully');
        }
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
      <InputForm
        control={control}
        name="productName"
        title="Product Name"
        placeholder="Nhập product name..."
        type="text"
      ></InputForm>
      <ImageListForm
        control={control}
        name="imageUrlList"
        title="Image List"
        setValue={setValue}
        url={imageUrlList}
        image={imageUrlList}
        setImage={setImageUrlList}
      ></ImageListForm>
      <InputForm
        control={control}
        name="warranteeYear"
        title="Warranty Year"
        placeholder="Nhập warranty..."
        type="number"
        min="0"
      ></InputForm>
      <InputForm
        control={control}
        name="originPrice"
        title="Origin Price"
        placeholder="Nhập product name..."
        type="number"
        min="0"
      ></InputForm>
      <InputForm
        control={control}
        name="salePercent"
        title="Sale Percent"
        placeholder="Nhập product name..."
        type="number"
        min="0"
      ></InputForm>
      <InputForm
        control={control}
        name="description"
        title="Description"
        placeholder="Nhập description..."
        type="text"
      ></InputForm>
      <SelectForm control={control} name="brand" title="Brand">
        <option value="">Chọn brand</option>
        {brandList.length > 0 &&
          brandList.map((brand) => (
            <option value={brand._id} key={brand._id}>
              {brand.name}
            </option>
          ))}
      </SelectForm>
      <InputForm
        control={control}
        name="generateCpu"
        title="Generate CPU"
        placeholder="Nhập generate cpu..."
        type="text"
      ></InputForm>
      <InputForm
        control={control}
        name="cpu"
        title="CPU"
        placeholder="Nhập cpu..."
        type="text"
      ></InputForm>
      <InputForm
        control={control}
        name="seriesCpu"
        title="Series CPU"
        placeholder="Nhập Series CPU..."
        type="text"
      ></InputForm>
      <InputForm
        control={control}
        name="chip"
        title="Chip"
        placeholder="Nhập chip..."
        type="text"
      ></InputForm>
      <InputForm
        control={control}
        name="ramName"
        title="RAM Name"
        placeholder="Nhập Ram Name..."
        type="text"
      ></InputForm>
      <InputForm
        control={control}
        name="ramSize"
        title="RAM Size"
        placeholder="Nhập Ram size..."
        type="number"
        min="0"
      ></InputForm>
      <InputForm
        control={control}
        name="screen"
        title="Screen"
        placeholder="Nhập screen..."
        type="text"
      ></InputForm>
      <InputForm
        control={control}
        name="storageName"
        title="Storage Name"
        placeholder="Nhập storage name..."
        type="text"
      ></InputForm>
      <InputForm
        control={control}
        name="storageSize"
        title="Storage Size"
        placeholder="Nhập storage size..."
        type="text"
      ></InputForm>
      <InputForm
        control={control}
        name="storagePortName"
        title="Storage Port Name"
        placeholder="Nhập storage port name..."
        type="text"
      ></InputForm>
      <InputForm
        control={control}
        name="storagePortNum"
        title="Storage Port Num"
        placeholder="Nhập storage port num..."
        type="number"
        min="0"
      ></InputForm>
      <InputForm
        control={control}
        name="storagePortMaximum"
        title="Storage Port Maximum"
        placeholder="Nhập storage port maximum..."
        type="number"
        min="0"
      ></InputForm>
      <InputForm
        control={control}
        name="storagePortMaximum"
        title="Storage Port Maximum"
        placeholder="Nhập storage port maximum..."
        type="number"
        min="0"
      ></InputForm>
      <InputForm
        control={control}
        name="supportM2slotType"
        title="Storage M2 Slot Type"
        placeholder="Nhập..."
        type="text"
      ></InputForm>
      <InputForm
        control={control}
        name="screenOutputPortName"
        title="Screen Output Port Name"
        placeholder="Nhập..."
        type="text"
      ></InputForm>
      <InputForm
        control={control}
        name="screenOutputPortNum"
        title="Screen Output Port Num"
        placeholder="Nhập..."
        type="number"
        min="0"
      ></InputForm>
      <InputForm
        control={control}
        name="bluetooth"
        title="Bluetooth"
        placeholder="Nhập..."
        type="text"
      ></InputForm>
      <InputForm
        control={control}
        name="keyboard"
        title="Keyboard"
        placeholder="Nhập..."
        type="text"
      ></InputForm>
      <InputForm
        control={control}
        name="operationSystem"
        title="Operation System"
        placeholder="Nhập..."
        type="text"
      ></InputForm>
      <InputForm
        control={control}
        name="size"
        title="Size"
        placeholder="Nhập..."
        type="text"
      ></InputForm>
      <InputForm
        control={control}
        name="pin"
        title="Pin"
        placeholder="Nhập..."
        type="number"
        min="0"
      ></InputForm>
      <InputForm
        control={control}
        name="weight"
        title="Weight"
        placeholder="Nhập..."
        type="number"
        min="0"
      ></InputForm>
      <InputForm
        control={control}
        name="seriesLaptop"
        title="Series Laptop"
        placeholder="Nhập..."
        type="text"
      ></InputForm>
      <InputForm
        control={control}
        name="partNumber"
        title="Part Number"
        placeholder="Nhập..."
        type="text"
      ></InputForm>
      <InputForm
        control={control}
        name="color"
        title="Color"
        placeholder="Nhập..."
        type="text"
      ></InputForm>
      <InputForm
        control={control}
        name="accessoriesIncluded"
        title="Accessories Included"
        placeholder="Nhập..."
        type="text"
      ></InputForm>
      <div className="flex justify-between gap-3">
        <CheckBoxForm control={control} name="led" title="Led"></CheckBoxForm>
        <CheckBoxForm
          control={control}
          name="touchScreen"
          title="Touch Screen"
        ></CheckBoxForm>
      </div>
      <Button type="submit" className="primary" disabled={isLoading}>
        Ok
      </Button>
    </form>
  );
};

export default ProductForm;

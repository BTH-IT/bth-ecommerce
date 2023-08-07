'use client';

import InputForm from '@/app/(user)/(auth)/_components/InputForm';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { ProductType } from '@/types/product';
import { handleRefreshToken } from '@/utils/clientActions';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '@/components/Button';
import Image from 'next/image';
import AmountImportProductAction from './AmountImportProductAction';
import importOrderService from '@/services/importOrderService';
import SelectForm from '@/app/(user)/(auth)/_components/SelectForm';
import supplierService from '@/services/supplierService';
import { SupplierType } from '@/types/supplier';
import { selectAuth } from '@/redux/features/authSlice';

const schema = yup
  .object({
    benefitPercent: yup
      .number()
      .min(0, 'This field must be greater than or equal to 0')
      .max(100, 'This field must be less than or equal to 100')
      .required('This field is required'),
    supplier: yup.string().required('This field is required'),
  })
  .required();

export type ImportProductType = ProductType & {
  amount: number;
  price: number;
};

const ImportProductForm = ({
  checkedKeys,
  handleClose,
}: {
  checkedKeys: ProductType[];
  handleClose: () => void;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [supplierList, setSupplierList] = useState<SupplierType[]>([]);
  const user: any = useAppSelector(selectAuth).user;

  const [importProductList, setImportProductList] = useState<
    ImportProductType[]
  >(
    checkedKeys.map((product) => {
      return {
        ...product,
        price: product.originPrice,
        amount: 1,
      };
    }),
  );

  useEffect(() => {
    async function fetchSupplierList() {
      try {
        await handleRefreshToken(dispatch);

        const res = await supplierService.getAll();

        setSupplierList(res);
      } catch (error: any) {
        console.log(error.message);
      }
    }

    fetchSupplierList();
  }, []);

  const {
    handleSubmit,
    formState: { isValid, isLoading },
    control,
  } = useForm<any>({
    defaultValues: {
      benefitPercent: 0,
      supplier: '',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data: any) => {
    if (!isValid) return;

    const invalidProduct = importProductList.find(
      (importProduct) => importProduct.amount <= 0 || importProduct.price <= 0,
    );

    if (Boolean(invalidProduct)) {
      toast(
        `${invalidProduct?.productName}'s amount field or price field is a required and greater than 0`,
      );
      return;
    }

    const importProducts = importProductList.map((importProduct) => {
      const benefitPrice =
        (importProduct.price * data.benefitPercent) / 100 + importProduct.price;

      if (benefitPrice >= importProduct.originPrice)
        return {
          product: importProduct._id,
          price: benefitPrice,
          amount: importProduct.amount,
        };

      return {
        product: importProduct._id,
        price: importProduct.originPrice,
        amount: importProduct.amount,
      };
    });

    try {
      const success = await handleRefreshToken(dispatch);

      if (success) {
        await importOrderService.add({
          employee: user._id,
          benefitPercent: data.benefitPercent,
          importProducts,
          supplier: data.supplier,
        });
        toast.success('Update feature successfully');
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
        name="benefitPercent"
        title="Benefit Percent"
        placeholder="Nhập percent..."
        type="number"
      ></InputForm>
      <SelectForm control={control} name="supplier" title="Supplier">
        <option value="" hidden>
          Chọn supplier
        </option>
        {supplierList.length > 0 &&
          supplierList.map((supplier) => (
            <option value={supplier._id} key={supplier._id}>
              {supplier.name}
            </option>
          ))}
      </SelectForm>
      <ul className="import-products_list">
        <h1>Import Product List</h1>
        {importProductList.length > 0 &&
          importProductList.map((product) => (
            <li className="import-products_item" key={product._id}>
              <Image
                src={product.imageUrlList[0]}
                alt={product.productName}
                width={100}
                height={100}
                className="import-products_image"
              ></Image>
              <div className="import-products_info">
                <h3>{product.productName}</h3>
                <AmountImportProductAction
                  importProduct={product}
                  importProductList={importProductList}
                  setImportProductList={setImportProductList}
                ></AmountImportProductAction>
              </div>
            </li>
          ))}
      </ul>
      <Button type="submit" className="primary" disabled={isLoading}>
        Ok
      </Button>
    </form>
  );
};

export default ImportProductForm;

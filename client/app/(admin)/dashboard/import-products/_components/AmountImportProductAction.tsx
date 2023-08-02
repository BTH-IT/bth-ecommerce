import React, { ChangeEvent, useRef, useState } from 'react';
import { ImportProductType } from './ImportProductForm';
import toast from 'react-hot-toast';

const AmountImportProductAction = ({
  importProduct,
  importProductList,
  setImportProductList,
}: {
  importProduct: ImportProductType;
  importProductList: ImportProductType[];
  setImportProductList: React.Dispatch<
    React.SetStateAction<ImportProductType[]>
  >;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [minusDisabled, setMinusDisabled] = useState(
    importProduct.amount === 1,
  );

  const handleMinusAmount = async () => {
    if (!inputRef || !inputRef.current || !importProduct) return;

    const value = inputRef.current.value;

    if (!value) return;

    if (Number(value) - 1 <= 1) {
      setMinusDisabled(true);
    } else {
      setMinusDisabled(false);
    }

    const importProductIdx = importProductList.findIndex(
      (product: ImportProductType) => product._id === importProduct._id,
    );

    inputRef.current.value = Number(inputRef.current.value) - 1 + '';

    importProductList[importProductIdx].amount = Number(inputRef.current.value);

    setImportProductList(importProductList);
  };

  const handlePlusAmount = async () => {
    if (!inputRef || !inputRef.current) return;

    const value = inputRef.current.value;

    if (!value) return;

    setMinusDisabled(false);

    const importProductIdx = importProductList.findIndex(
      (product: ImportProductType) => product._id === importProduct._id,
    );

    inputRef.current.value = Number(inputRef.current.value) + 1 + '';

    importProductList[importProductIdx].amount = Number(inputRef.current.value);

    setImportProductList(importProductList);
  };

  const handleChangeAmount = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!value) return;

    if (Number(value) <= 0) {
      toast(
        `${importProduct?.productName}'s amount field is a required and greater than 0`,
      );
      e.target.value = importProduct.amount + '';
      return;
    }

    const importProductIdx = importProductList.findIndex(
      (product: ImportProductType) => product._id === importProduct._id,
    );

    importProductList[importProductIdx].amount = Number(value);

    if (Number(value) > 1) setMinusDisabled(false);
    else setMinusDisabled(true);

    setImportProductList(importProductList);
  };

  const handleUpdatePrice = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!value) return;

    if (Number(value) <= 0) {
      e.target.value = importProduct.price + '';
      toast(
        `${importProduct?.productName}'s price field is a required and greater than 0`,
      );
      return;
    }

    const importProductIdx = importProductList.findIndex(
      (product: ImportProductType) => product._id === importProduct._id,
    );

    importProductList[importProductIdx].price = Number(value);

    setImportProductList(importProductList);
  };

  return (
    <>
      <div className="product-amount_container">
        <button
          className="product-amount_minus"
          onClick={handleMinusAmount}
          disabled={minusDisabled}
          type="button"
        >
          -
        </button>
        <input
          type="number"
          name="amount"
          id="amount"
          min="1"
          ref={inputRef}
          defaultValue={importProduct.amount}
          onChange={handleChangeAmount}
        />
        <button
          className="product-amount_plus"
          onClick={handlePlusAmount}
          type="button"
        >
          +
        </button>
      </div>
      <div className="mb-1 input_container">
        <div className="input">
          <input
            id="price-import-product"
            type="number"
            placeholder="Giá..."
            defaultValue={importProduct.price}
            onChange={handleUpdatePrice}
          />
          VNĐ
        </div>
      </div>
    </>
  );
};

export default AmountImportProductAction;

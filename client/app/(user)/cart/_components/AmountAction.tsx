import { authActions } from '@/redux/features/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import productService from '@/services/productService';
import { CartType } from '@/types/cart';
import { ProductType } from '@/types/product';
import debounce from 'lodash.debounce';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

const AmountAction = ({ cart }: { cart: CartType }) => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [minusDisabled, setMinusDisabled] = useState(cart.amount === 1);
  const [plusDisabled, setPlusDisabled] = useState(false);
  const [product, setProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res: ProductType = await productService.getById(cart._id);
        setProduct(res);
      } catch (error: any) {
        console.log(error.message);
      }
    }

    fetchProduct();
  }, []);

  const handleUpdateCartList = (newCartList: CartType[]) => {
    localStorage.setItem('cart_list', JSON.stringify(newCartList));
    dispatch(authActions.updateCartList({ cartList: newCartList }));
  };

  const handleMinusAmount = async () => {
    if (!inputRef || !inputRef.current || !product) return;

    const cartId = cart._id;
    const value = inputRef.current.value;
    const newCartList = JSON.parse(localStorage.getItem('cart_list') || '[]');

    if (!cartId || !value) return;

    if (Number(value) - 1 <= 1) {
      setPlusDisabled(false);
      setMinusDisabled(true);
    } else {
      setMinusDisabled(false);
      setPlusDisabled(false);
    }

    const cartIdx = newCartList.findIndex(
      (cart: CartType) => cart._id === cartId,
    );

    inputRef.current.value = Number(inputRef.current.value) - 1 + '';

    newCartList[cartIdx].amount = Number(inputRef.current.value);

    handleUpdateCartList(newCartList);
  };

  const handlePlusAmount = async () => {
    if (!inputRef || !inputRef.current || !product) return;

    const cartId = cart._id;
    const value = inputRef.current.value;
    const newCartList = JSON.parse(localStorage.getItem('cart_list') || '[]');

    if (!cartId || !value) return;

    if (Number(value) + 1 >= product.remain) {
      setMinusDisabled(false);
      toast(
        `${product.productName} is currently only ${product.remain} products`,
      );
      setPlusDisabled(true);
    } else {
      setMinusDisabled(false);
      setPlusDisabled(false);
    }

    const cartIdx = newCartList.findIndex(
      (cart: CartType) => cart._id === cartId,
    );

    inputRef.current.value = Number(inputRef.current.value) + 1 + '';

    newCartList[cartIdx].amount = Number(inputRef.current.value);

    handleUpdateCartList(newCartList);
  };

  const handleChangeAmount = debounce(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const cartId = cart._id;
      const value = e.target.value;
      const newCartList = JSON.parse(localStorage.getItem('cart_list') || '[]');

      if (!cartId || !value || !product) return;

      if (Number(value) <= 1) return;

      const cartIdx = newCartList.findIndex(
        (cart: CartType) => cart._id === cartId,
      );

      newCartList[cartIdx].remain = product.remain;

      if (Number(value) > 1) setMinusDisabled(false);
      if (Number(value) < product.remain) setPlusDisabled(false);

      if (Number(value) > newCartList[cartIdx].remain) {
        toast(
          `${newCartList[cartIdx].productName} is currently only ${newCartList[cartIdx].remain} products`,
        );
        e.target.value = newCartList[cartIdx].remain;
        newCartList[cartIdx].amount = Number(e.target.value);
        setPlusDisabled(true);
        handleUpdateCartList(newCartList);
        return;
      }

      setMinusDisabled(false);
      setPlusDisabled(false);

      newCartList[cartIdx].amount = Number(value);
      handleUpdateCartList(newCartList);
    },
    500,
  );

  return (
    <div className="product-amount_container">
      <button
        className="product-amount_minus"
        onClick={handleMinusAmount}
        disabled={minusDisabled}
      >
        -
      </button>
      <input
        type="number"
        name="amount"
        id="amount"
        min="1"
        ref={inputRef}
        defaultValue={cart.amount}
        onChange={handleChangeAmount}
      />
      <button
        className="product-amount_plus"
        onClick={handlePlusAmount}
        disabled={plusDisabled}
      >
        +
      </button>
    </div>
  );
};

export default AmountAction;

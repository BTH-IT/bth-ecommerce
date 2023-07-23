'use client';
import Button from '@/components/Button';
import { authActions } from '@/redux/features/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { ProductType } from '@/types/product';
import { handleCart } from '@/utils/clientActions';
import React from 'react';
import toast from 'react-hot-toast';

const AddProductToCart = ({ product }: { product: ProductType }) => {
  const dispatch = useAppDispatch();
  const handleBuyNow = (product: ProductType) => {
    if (handleCart(product)) {
      const cartList = JSON.parse(localStorage.getItem('cart_list') || '[]');
      dispatch(authActions.updateCartList({ cartList }));
      window.location.href = '/cart';
    }
  };

  const handleAddToCart = (product: ProductType) => {
    if (handleCart(product)) {
      const cartList = JSON.parse(localStorage.getItem('cart_list') || '[]');
      dispatch(authActions.updateCartList({ cartList }));
      toast.success('Thêm sản phẩm vào giỏ hàng thành công!!');
    }
  };

  return (
    <div className="grid grid-cols-3 gap-3 product__info-btn_container">
      <Button
        type="button"
        className="col-span-1 buy-btn"
        data={product}
        handleEventClick={handleBuyNow}
        disabled={product.remain === 0}
      >
        MUA NGAY
      </Button>
      <Button
        type="button"
        className="col-span-2 addToCart-btn"
        data={product}
        handleEventClick={handleAddToCart}
        disabled={product.remain === 0}
      >
        THÊM VÀO GIỎ HÀNG
      </Button>
    </div>
  );
};

export default AddProductToCart;

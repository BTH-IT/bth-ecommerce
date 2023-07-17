'use client';
import { CartType } from '@/types/cart';
import { ProductType } from '@/types/product';
import toast from 'react-hot-toast';

function handleCart(product: ProductType) {
  const cart = {
    _id: product._id,
    thumbUrl: product.imageUrlList[0],
    productName: product.productName,
    amount: 1,
    salePercent: product.salePercent,
    originPrice: product.originPrice,
    remain: product.remain,
  };

  const cartList: CartType[] = JSON.parse(
    localStorage.getItem('cart_list') || '[]',
  );

  const isHad = cartList.findIndex((c: CartType) => c._id === cart._id);

  if (isHad !== -1) {
    if (cartList[isHad].amount + cart.amount > cart.remain) {
      toast.error('Số lượng sản phẩm đã hết!!');
      return false;
    }
    cartList[isHad].amount += cart.amount;
  } else {
    cartList.push(cart);
  }

  localStorage.setItem('cart_list', JSON.stringify(cartList));

  return true;
}

export function handleBuyNow(product: ProductType) {
  if (handleCart(product)) {
    window.location.href = '/cart';
  }
}

export function handleAddToCart(product: ProductType) {
  if (handleCart(product)) {
    toast.success('Thêm sản phẩm vào giỏ hàng thành công!!');
  }
}

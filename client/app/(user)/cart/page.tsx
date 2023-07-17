import Link from 'next/link';
import React from 'react';
import '../../../css/pages/cart.css';
import { Metadata } from 'next';
import CartContentPage from './_components/CartContentPage';

export const metadata: Metadata = {
  title: 'BTH Ecommerce | Cart',
  description: 'BTH Ecommerce | Cart',
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
};

const CartPage = () => {
  return (
    <section className="container">
      <div className="cart-link">
        <Link href="/">Trang chủ </Link>
        <span id="seperate">/</span>
        <span> Giỏ hàng</span>
      </div>
      <CartContentPage></CartContentPage>
    </section>
  );
};

export default CartPage;

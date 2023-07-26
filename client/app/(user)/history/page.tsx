import { Metadata } from 'next';
import React from 'react';
import '../../../css/pages/history.css';
import Link from 'next/link';
import HistoryContentPage from './_components/HistoryContentPage';

export const metadata: Metadata = {
  title: 'BTH Ecommerce | History',
  description: 'BTH Ecommerce | History',
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
};

const HistoryPage = () => {
  return (
    <section className="container">
      <div className="history__link">
        <Link href="/">Trang chủ </Link>
        <span id="seperate">/</span>
        <span> Lịch sử mua hàng</span>
      </div>
      <HistoryContentPage></HistoryContentPage>
    </section>
  );
};

export default HistoryPage;

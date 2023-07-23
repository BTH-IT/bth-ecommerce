import React from 'react';
import ChangePasswordForm from './_components/ChangePasswordForm';
import '../../../css/pages/profile.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BTH Ecommerce | Change Password',
  description: 'BTH Ecommerce | Change Password',
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
};

const ChangePasswordPage = () => {
  return (
    <section className="container">
      <section className="profile-form">
        <h1>Cập nhật mật khẩu mới</h1>
        <ChangePasswordForm></ChangePasswordForm>
      </section>
    </section>
  );
};

export default ChangePasswordPage;

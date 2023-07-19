import { Metadata } from 'next';
import React from 'react';
import InformationForm from './_components/InformationForm';
import '../../../css/pages/profile.css';

export const metadata: Metadata = {
  title: 'BTH Ecommerce | Profile',
  description: 'BTH Ecommerce | Profile',
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
};

const ProfilePage = () => {
  return (
    <section className="container">
      <section className="profile-form">
        <h1>Thông tin tài khoản</h1>
        <InformationForm></InformationForm>
      </section>
    </section>
  );
};

export default ProfilePage;

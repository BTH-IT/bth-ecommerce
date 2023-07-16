import React from 'react';
import '../../../../css/pages/login.css';
import RegisterForm from '../_components/RegisterForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BTH Ecommerce | Register',
  description: 'BTH Ecommerce | Register',
};

const RegisterPage = () => {
  return (
    <section className="container">
      <section className="login-form">
        <h1>Đăng Kí</h1>
        <RegisterForm></RegisterForm>
      </section>
    </section>
  );
};

export default RegisterPage;

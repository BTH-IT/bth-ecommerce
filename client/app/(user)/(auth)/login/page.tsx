import '../../../../css/pages/login.css';
import { Metadata } from 'next';
import LoginForm from '../_components/LoginForm';

export const metadata: Metadata = {
  title: 'BTH Ecommerce | Login',
  description: 'BTH Ecommerce | Login',
};

const LoginPage = () => {
  return (
    <section className="container">
      <section className="login-form">
        <h1>Đăng nhập</h1>
        <LoginForm></LoginForm>
      </section>
    </section>
  );
};

export default LoginPage;

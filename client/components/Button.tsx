import React from 'react';

const Button = ({ type = 'button', className }: any) => {
  return (
    <button type={type} className={`${className} btn`}>
      MUA NGAY
    </button>
  );
};

export default Button;

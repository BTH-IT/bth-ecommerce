import React from 'react';

const Button = ({ type = 'button', children, className }: any) => {
  return (
    <button type={type} className={`${className} btn`}>
      {children}
    </button>
  );
};

export default Button;

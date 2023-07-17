'use client';

import React from 'react';

const Button = ({
  type = 'button',
  data,
  children,
  className,
  handleEventClick = () => {},
  disabled = false,
}: any) => {
  return (
    <button
      type={type}
      className={`${className} btn`}
      onClick={() => {
        if (handleEventClick) {
          handleEventClick(data);
        }
      }}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

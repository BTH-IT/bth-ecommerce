'use client';

import React from 'react';
import { useController } from 'react-hook-form';

const InputForm = ({
  control,
  name,
  title,
  icon,
  iconActionClick = () => {},
  defaultValue = '',
  ...props
}: any) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
    defaultValue: defaultValue,
  });

  return (
    <div className="input_container">
      <label htmlFor={name} className="label">
        {title}
      </label>
      <div className={`input ${error && error.message ? 'input-error' : ''}`}>
        <input {...props} {...field} id={name} />
        {icon && (
          <span className="icon icon-password" onClick={iconActionClick}>
            {icon}
          </span>
        )}
      </div>
      {error && error.message && (
        <span className="mb-1 text-xl text-red-500 error">{error.message}</span>
      )}
    </div>
  );
};

export default InputForm;

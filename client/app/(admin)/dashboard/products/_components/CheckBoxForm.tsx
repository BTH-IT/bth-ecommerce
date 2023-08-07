import React from 'react';
import { useController } from 'react-hook-form';

const CheckBoxForm = ({
  control,
  name,
  title,
  defaultValue = false,
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
    <div className="input_container checkbox">
      <label htmlFor={name} className="label">
        {title}
      </label>
      <div className={`input ${error && error.message ? 'input-error' : ''}`}>
        <input {...props} {...field} id={name} type="checkbox" />
      </div>
      {error && error.message && (
        <span className="mb-1 text-xl text-red-500 error">{error.message}</span>
      )}
    </div>
  );
};

export default CheckBoxForm;

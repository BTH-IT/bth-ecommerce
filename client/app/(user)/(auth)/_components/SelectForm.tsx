import React from 'react';
import { useController } from 'react-hook-form';

const SelectForm = ({
  control,
  name,
  title = 'Giới tính',
  defaultValue = '',
  placeholder = 'Chọn gender',
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
    <div className="select_container">
      <label htmlFor={name} className="label">
        {title}
      </label>
      <div className="select">
        <select id={name} {...field} {...props}>
          <option value="" hidden>
            {placeholder}
          </option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
          <option value="Khác">Khác</option>
        </select>
      </div>
      {error && error.message && (
        <span className="mb-1 text-xl text-red-500 error">{error.message}</span>
      )}
    </div>
  );
};

export default SelectForm;

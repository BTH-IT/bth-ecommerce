import React from 'react';
import { useController } from 'react-hook-form';

const SelectForm = ({
  control,
  name,
  title,
  placeholder = 'Chọn gender',
  ...props
}: any) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  return (
    <div className="select_container">
      <label htmlFor={name} className="label">
        Giới tính
      </label>
      <div className="select">
        <select id={name} {...field} {...props} defaultValue={''}>
          <option value="" hidden>
            {placeholder}
          </option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
          <option value="Khác">Khác</option>
        </select>
      </div>
      {error && error.message && (
        <span className="mb-1 text-danger error">{error.message}</span>
      )}
    </div>
  );
};

export default SelectForm;

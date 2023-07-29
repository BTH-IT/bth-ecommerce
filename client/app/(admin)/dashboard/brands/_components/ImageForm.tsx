'use client';

import { PhotoIcon, TrashIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import React, { ChangeEvent, useRef } from 'react';
import { useController } from 'react-hook-form';
import '../../../../../css/components/label.css';

const ImageForm = ({
  control,
  name,
  setValue,
  url,
  image,
  title,
  setImage,
  ...props
}: any) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    field: { name: id, value },
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length < 0 || !e.target.files[0])
      return;
    setValue(name, e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleRemoveImage = () => {
    if (inputRef.current) {
      inputRef.current.files = null;
      inputRef.current.value = '';
    }

    setValue(name, '');
    setImage('');
  };

  return (
    <div className="image_container">
      <div className="flex flex-col mt-2">
        <h2 className="mb-2 text-xl font-semibold">{title}</h2>
        <div className="image">
          <input
            id={id}
            name={id}
            {...props}
            onChange={handleChange}
            defaultValue={value}
            ref={inputRef}
            type="file"
            hidden
          />
          <label htmlFor={id}>
            {image ? (
              <Image src={image} alt="avatar" width={10000} height={10000} />
            ) : (
              <PhotoIcon className={`text-black`} />
            )}
          </label>
          <div className={`image-trash ${image ? 'active' : ''}`}>
            <TrashIcon
              className="w-10 h-10 text-red-600"
              onClick={handleRemoveImage}
            />
          </div>
        </div>
        {error && error.message && (
          <span className="mb-1 text-xl text-red-500 error">
            {error.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default ImageForm;

'use client';

import Image from 'next/image';
import React, { ChangeEvent, useRef, useState } from 'react';
import { useController } from 'react-hook-form';

const AvatarInput = ({
  control,
  name,
  setValue,
  url = 'https://server.bthung313.site/images/avatar.jpg',
  ...props
}: any) => {
  const [image, setImage] = useState(url);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length < 0 || !e.target.files[0])
      return;
    setValue(name, e.target.files);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const {
    field: { name: id, value },
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  const handleRemoveImage = () => {
    if (inputRef.current) {
      inputRef.current.files = null;
      inputRef.current.value = '';
    }

    setValue(name, '');
    setImage('https://server.bthung313.site/images/avatar.jpg');
  };

  return (
    <div className="avatar_container">
      <div className="mt-2 flex justify-center items-center flex-col">
        <div className="avatar">
          <input
            id={id}
            name={id}
            {...props}
            onChange={handleChange}
            defaultValue={value}
            ref={inputRef}
            type="file"
          />
          <label htmlFor="avatar">
            <Image src={image} alt="avatar" width={10000} height={10000} />
          </label>
          <svg
            className={value ? 'active' : ''}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            onClick={handleRemoveImage}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
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

export default AvatarInput;

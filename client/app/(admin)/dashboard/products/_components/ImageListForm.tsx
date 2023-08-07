'use client';

import React, { ChangeEvent, useRef } from 'react';
import { useController } from 'react-hook-form';
import '../../../../../css/components/label.css';
import ImageListItem from './ImageListItem';

const ImageListForm = ({
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
  } = useController({
    control,
    name,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length < 0 || !e.target.files[0])
      return;
    setValue(name, e.target.files);
    const imageList = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file),
    );

    setImage((prev: any) => [...prev, ...imageList]);
  };

  return (
    <div className="image_container">
      <div className="flex flex-col gap-2 mt-2">
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
            multiple
          />
        </div>
        {image.length > 0 &&
          image.map((img: any, index: number) => (
            <ImageListItem
              img={img}
              image={image}
              inputRef={inputRef}
              setValue={setValue}
              setImage={setImage}
              name={name}
              index={index}
            ></ImageListItem>
          ))}
      </div>
    </div>
  );
};

export default ImageListForm;

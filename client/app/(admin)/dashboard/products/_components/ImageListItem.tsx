import { TrashIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import React from 'react';

const ImageListItem = ({
  img,
  image,
  inputRef,
  setValue,
  setImage,
  name,
  index,
}: any) => {
  const handleRemoveImage = () => {
    if (image.length <= 0) {
      inputRef.current.files = null;
      inputRef.current.value = '';
      setValue(name, []);
      setImage('');
    } else {
      setValue(
        name,
        Array.from(inputRef.current.files).filter((file, idx) => idx !== index),
      );
      setImage(image.filter((value: any, idx: number) => idx !== index));
    }
  };

  return (
    <div className="image-preview" key={img}>
      <Image src={img} alt={img} width={300} height={300}></Image>
      <div className={`image-trash ${img ? 'active' : ''}`}>
        <TrashIcon
          className="w-10 h-10 text-red-600"
          onClick={handleRemoveImage}
        />
      </div>
    </div>
  );
};

export default ImageListItem;

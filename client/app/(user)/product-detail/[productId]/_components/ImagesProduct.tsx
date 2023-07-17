import Image from 'next/image';
import React from 'react';

const ImagesProduct = ({ imageList }: any) => {
  return (
    <div className="product__info-img_container">
      <div className="product__info-img_main-img zoom">
        <Image
          className="main-img"
          src="https://images.unsplash.com/photo-1688993536536-df108751b415?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt="image-main"
          width={100000}
          height={100000}
        ></Image>
        <Image
          src="https://images.unsplash.com/photo-1688993536536-df108751b415?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt="sf314.webp"
          id="imgZoom"
          width={100000}
          height={100000}
        ></Image>
      </div>
      <div className="product__info-img_sub-img">
        <Image
          className="sub-img active"
          src="https://images.unsplash.com/photo-1688993536536-df108751b415?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt="image-main"
          width={100000}
          height={100000}
        ></Image>
        <Image
          className="sub-img"
          src="https://images.unsplash.com/photo-1688993536536-df108751b415?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt="image-main"
          width={100000}
          height={100000}
        ></Image>
        <Image
          className="sub-img"
          src="https://images.unsplash.com/photo-1688993536536-df108751b415?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt="image-main"
          width={100000}
          height={100000}
        ></Image>
        <Image
          className="sub-img"
          src="https://images.unsplash.com/photo-1688993536536-df108751b415?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt="image-main"
          width={100000}
          height={100000}
        ></Image>
      </div>
    </div>
  );
};

export default ImagesProduct;

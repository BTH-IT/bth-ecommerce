'use client';
import ProductCard from '@/components/ProductCard';
import Slider from '@/components/Slider';
import { ProductType } from '@/types/product';
import React from 'react';
import { SwiperSlide } from 'swiper/react';

const ProductSlider = ({ productList }: { productList: ProductType[] }) => {
  return (
    <Slider
      isNavigation={true}
      isPagination={false}
      isLoop={true}
      autoplay={{
        delay: 10000,
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
      }}
      slidesPerView={4}
    >
      <>
        {productList && productList.length > 0 ? (
          productList.map((product: any) => (
            <SwiperSlide key={product._id}>
              <ProductCard {...product}></ProductCard>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div className="product-card">
              <div className="product-card_image skeleton skeleton-product-img"></div>
              <div className="product-card_info">
                <div className="skeleton skeleton-text"></div>
                <div className="mt-2 skeleton skeleton-new-price"></div>
                <div className="mt-2 skeleton skeleton-old-price"></div>
                <div className="mt-2 skeleton skeleton-save-price"></div>
              </div>
            </div>
          </SwiperSlide>
        )}
      </>
    </Slider>
  );
};

export default ProductSlider;

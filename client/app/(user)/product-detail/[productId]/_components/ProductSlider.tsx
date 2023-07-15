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
            {/* <div className="slider-background">
              <div className="skeleton skeleton-banner"></div>
            </div> */}
          </SwiperSlide>
        )}
      </>
    </Slider>
  );
};

export default ProductSlider;

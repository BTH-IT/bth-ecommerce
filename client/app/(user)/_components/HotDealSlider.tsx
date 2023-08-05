'use client';

import Slider from '@/components/Slider';
import React from 'react';
import ProductCard from '../../../components/ProductCard';
import { ProductType } from '@/types/product';
import { SwiperSlide } from 'swiper/react';

const HotDealSlider = ({ hotDealList }: { hotDealList: ProductType[] }) => {
  return (
    <Slider
      spaceBetween={10}
      isNavigation={true}
      isPagination={false}
      isLoop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
      }}
      slidesPerView={4}
    >
      <>
        {hotDealList && hotDealList.length > 0 ? (
          hotDealList.map((product: ProductType) => (
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

export default HotDealSlider;

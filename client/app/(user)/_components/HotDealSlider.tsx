'use client';

import Slider from '@/components/Slider';
import React from 'react';
import ProductCard from '../../../components/ProductCard';
import { ProductType } from '@/types/product';
import { SwiperSlide } from 'swiper/react';

const HotDealSlider = ({ hotDealList }: { hotDealList: ProductType[] }) => {
  return (
    <Slider
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
                <div className="skeleton skeleton-new-price mt-2"></div>
                <div className="skeleton skeleton-old-price mt-2"></div>
                <div className="skeleton skeleton-save-price mt-2"></div>
              </div>
            </div>
          </SwiperSlide>
        )}
      </>
    </Slider>
  );
};

export default HotDealSlider;

'use client';

import Slider from '@/components/Slider';
import { BannerType } from '@/types/banner';
import Image from 'next/image';
import React from 'react';
import { SwiperSlide } from 'swiper/react';

const BannerSlider = ({ bannerList }: { bannerList: BannerType[] }) => {
  return (
    <Slider
      isNavigation={true}
      isPagination={true}
      isLoop={true}
      autoplay={{
        delay: 8000,
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
      }}
      slidesPerView={1}
    >
      <>
        {bannerList && bannerList.length > 0 ? (
          bannerList.map((item: any) => (
            <SwiperSlide key={item}>
              <div className="slider-background">
                <Image
                  src="https://images.unsplash.com/photo-1682687982468-4584ff11f88a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="anh dep"
                  width={10000}
                  height={10000}
                />
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div className="slider-background">
              <div className="skeleton skeleton-banner"></div>
            </div>
          </SwiperSlide>
        )}
      </>
    </Slider>
  );
};

export default BannerSlider;

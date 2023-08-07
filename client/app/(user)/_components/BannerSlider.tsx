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
          bannerList.map((item: BannerType) => (
            <SwiperSlide key={item._id}>
              <div className="slider-background">
                <Image
                  src={item.thumbUrl}
                  alt={item.name}
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

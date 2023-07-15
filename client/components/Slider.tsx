'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import '../css/layouts/slider.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import React from 'react';

type SliderType = {
  isNavigation: boolean;
  isPagination: boolean;
  isLoop: boolean;
  autoplay: {
    delay: number;
    disableOnInteraction: boolean;
    pauseOnMouseEnter: boolean;
  };
  slidesPerView: number;
  children: React.ReactNode;
};

const Slider = ({
  isNavigation = true,
  isPagination = true,
  isLoop = true,
  autoplay = {
    delay: 8000,
    disableOnInteraction: true,
    pauseOnMouseEnter: true,
  },
  slidesPerView = 1,
  children,
}: SliderType) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={slidesPerView}
      navigation={isNavigation}
      pagination={isPagination ? { clickable: true } : false}
      loop={isLoop}
      autoplay={autoplay}
    >
      {children}
    </Swiper>
  );
};

export default Slider;

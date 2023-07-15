'use client';

import Slider from '@/components/Slider';
import { BannerType } from '@/types/banner';
import { BrandType } from '@/types/brand';
import Image from 'next/image';
import React from 'react';
import { SwiperSlide } from 'swiper/react';

const BrandSlider = ({ brandList }: { brandList: BrandType[] }) => {
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
      slidesPerView={3}
    >
      <>
        {brandList && brandList.length > 0 ? (
          brandList.map((brand: BrandType) => (
            <SwiperSlide key={brand._id}>
              <a
                className="top-brands_card"
                href={`/search.html?thuong_hieu=${brand.name}`}
              >
                <div className="top-brands_image">
                  <Image
                    src={brand.thumbUrl}
                    alt={brand.name}
                    width={10000}
                    height={10000}
                  />
                </div>
                <h3 className="top-brands_title">{brand.name}</h3>
              </a>
            </SwiperSlide>
          ))
        ) : (
          <>
            <SwiperSlide>
              <div className="top-brands_card">
                <div className="skeleton skeleton-brand-img"></div>
                <div className="mx-auto mt-2 skeleton skeleton-text w-50"></div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="top-brands_card">
                <div className="skeleton skeleton-brand-img"></div>
                <div className="mx-auto mt-2 skeleton skeleton-text w-50"></div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="top-brands_card">
                <div className="skeleton skeleton-brand-img"></div>
                <div className="mx-auto mt-2 skeleton skeleton-text w-50"></div>
              </div>
            </SwiperSlide>
          </>
        )}
      </>
    </Slider>
  );
};

export default BrandSlider;

import Slider from "@/components/Slider";
import { BannerType } from "@/types/banner";
import Image from "next/image";
import React from "react";

const BannerSlider = (props: { bannerList: BannerType[] }) => {
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
      list={props.bannerList}
    >
      <div className="slider-background">
        <Image
          src="https://images.unsplash.com/photo-1682687982468-4584ff11f88a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt="anh dep"
          fill={true}
        />
      </div>
    </Slider>
  );
};

export default BannerSlider;

'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';

const ImagesProduct = ({ imageList }: any) => {
  const [active, setActive] = useState<string>(imageList[0]);
  const imgZoomRef = useRef<HTMLImageElement | null>(null);
  const zoomRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="product__info-img_container">
      <div
        className="product__info-img_main-img zoom"
        ref={zoomRef}
        onMouseMove={(e: any) => {
          console.dir(e.target);
          if (imgZoomRef.current && zoomRef.current) {
            imgZoomRef.current.style.opacity = '1';
            let positionPx =
              e.clientX - zoomRef.current.getBoundingClientRect().left;
            let positionX = (positionPx / zoomRef.current.offsetWidth) * 100;

            let positionPy =
              e.clientY - zoomRef.current.getBoundingClientRect().top;
            let positionY = (positionPy / zoomRef.current.offsetHeight) * 100;

            imgZoomRef.current.style.setProperty('--zoom-x', positionX + '%');
            imgZoomRef.current.style.setProperty('--zoom-y', positionY + '%');
          }
        }}
        onMouseOut={() => {
          if (imgZoomRef.current) {
            imgZoomRef.current.style.opacity = '0';
          }
        }}
      >
        <Image
          className="main-img"
          src={active}
          alt={active}
          width={100000}
          height={100000}
        ></Image>
        <Image
          src={active}
          alt={active}
          id="imgZoom"
          width={100000}
          height={100000}
          ref={imgZoomRef}
        ></Image>
      </div>
      <div className="product__info-img_sub-img">
        {imageList.map((image: any) => (
          <Image
            key={image}
            className={`sub-img ${active === image ? 'active' : ''}`}
            src={image}
            alt={image}
            width={100000}
            height={100000}
            onMouseEnter={() => {
              setActive(image);
            }}
          ></Image>
        ))}
      </div>
    </div>
  );
};

export default ImagesProduct;

import Link from "next/link";
import React from "react";

const Loading = () => {
  return (
    <section className="container">
      <section className="main">
        <ul className="brand">
          <li className="brand_item">
            <div className="brand_link">
              <span className="skeleton skeleton-icon"></span>
              <div className="skeleton skeleton-text"></div>
            </div>
          </li>
          <li className="brand_item">
            <div className="brand_link">
              <span className="skeleton skeleton-icon"></span>
              <div className="skeleton skeleton-text"></div>
            </div>
          </li>
          <li className="brand_item">
            <div className="brand_link">
              <span className="skeleton skeleton-icon"></span>
              <div className="skeleton skeleton-text"></div>
            </div>
          </li>
          <li className="brand_item">
            <div className="brand_link">
              <span className="skeleton skeleton-icon"></span>
              <div className="skeleton skeleton-text"></div>
            </div>
          </li>
          <li className="brand_item">
            <div className="brand_link">
              <span className="skeleton skeleton-icon"></span>
              <div className="skeleton skeleton-text"></div>
            </div>
          </li>
          <li className="brand_item">
            <div className="brand_link">
              <span className="skeleton skeleton-icon"></span>
              <div className="skeleton skeleton-text"></div>
            </div>
          </li>
          <li className="brand_item">
            <div className="brand_link">
              <span className="skeleton skeleton-icon"></span>
              <div className="skeleton skeleton-text"></div>
            </div>
          </li>
          <li className="brand_item">
            <div className="brand_link">
              <span className="skeleton skeleton-icon"></span>
              <div className="skeleton skeleton-text"></div>
            </div>
          </li>
        </ul>

        <div className="slider">
          <div className="slider-background">
            <div className="skeleton skeleton-banner"></div>
          </div>
        </div>
      </section>

      <section className="deal">
        <div className="deal-header">
          <h1>
            <span className="deal-color">DEAL HOT</span> CHO BẠN
          </h1>
          <Link href="/search" className="deal-more">
            <span>Xem thêm</span>
            <i className="fa-solid fa-chevron-right"></i>
          </Link>
        </div>
        <div className="deal-slider">
          <div className="grid grid-cols-4 gap-4">
            <div className="product-card">
              <div className="product-card_image skeleton skeleton-product-img"></div>
              <div className="product-card_info">
                <div className="skeleton skeleton-text"></div>
                <div className="mt-2 skeleton skeleton-new-price"></div>
                <div className="mt-2 skeleton skeleton-old-price"></div>
                <div className="mt-2 skeleton skeleton-save-price"></div>
              </div>
            </div>
            <div className="product-card">
              <div className="product-card_image skeleton skeleton-product-img"></div>
              <div className="product-card_info">
                <div className="skeleton skeleton-text"></div>
                <div className="mt-2 skeleton skeleton-new-price"></div>
                <div className="mt-2 skeleton skeleton-old-price"></div>
                <div className="mt-2 skeleton skeleton-save-price"></div>
              </div>
            </div>
            <div className="product-card">
              <div className="product-card_image skeleton skeleton-product-img"></div>
              <div className="product-card_info">
                <div className="skeleton skeleton-text"></div>
                <div className="mt-2 skeleton skeleton-new-price"></div>
                <div className="mt-2 skeleton skeleton-old-price"></div>
                <div className="mt-2 skeleton skeleton-save-price"></div>
              </div>
            </div>
            <div className="product-card">
              <div className="product-card_image skeleton skeleton-product-img"></div>
              <div className="product-card_info">
                <div className="skeleton skeleton-text"></div>
                <div className="mt-2 skeleton skeleton-new-price"></div>
                <div className="mt-2 skeleton skeleton-old-price"></div>
                <div className="mt-2 skeleton skeleton-save-price"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bestseller">
        <div className="bestseller_header">
          <h1>
            TOP 10 SẢN PHẨM
            <span className="bestseller_color"> BÁN CHẠY NHẤT</span>
          </h1>
          <Link href="/search" className="bestseller_more">
            <span>Xem thêm</span>
            <i className="fa-solid fa-chevron-right"></i>
          </Link>
        </div>
        <div className="bestseller_body">
          <div className="grid grid-cols-4 gap-4">
            <div className="product-card">
              <div className="product-card_image skeleton skeleton-product-img"></div>
              <div className="product-card_info">
                <div className="skeleton skeleton-text"></div>
                <div className="mt-2 skeleton skeleton-new-price"></div>
                <div className="mt-2 skeleton skeleton-old-price"></div>
                <div className="mt-2 skeleton skeleton-save-price"></div>
              </div>
            </div>
            <div className="product-card">
              <div className="product-card_image skeleton skeleton-product-img"></div>
              <div className="product-card_info">
                <div className="skeleton skeleton-text"></div>
                <div className="mt-2 skeleton skeleton-new-price"></div>
                <div className="mt-2 skeleton skeleton-old-price"></div>
                <div className="mt-2 skeleton skeleton-save-price"></div>
              </div>
            </div>
            <div className="product-card">
              <div className="product-card_image skeleton skeleton-product-img"></div>
              <div className="product-card_info">
                <div className="skeleton skeleton-text"></div>
                <div className="mt-2 skeleton skeleton-new-price"></div>
                <div className="mt-2 skeleton skeleton-old-price"></div>
                <div className="mt-2 skeleton skeleton-save-price"></div>
              </div>
            </div>
            <div className="product-card">
              <div className="product-card_image skeleton skeleton-product-img"></div>
              <div className="product-card_info">
                <div className="skeleton skeleton-text"></div>
                <div className="mt-2 skeleton skeleton-new-price"></div>
                <div className="mt-2 skeleton skeleton-old-price"></div>
                <div className="mt-2 skeleton skeleton-save-price"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="top-brands">
        <div className="top-brands_header">
          <h1>
            <span className="top-brands_color">THƯƠNG HIỆU ĐIỆN TỬ </span> HÀNG
            ĐẦU
          </h1>
          <Link href="/search" className="top-brands_more">
            <span>Xem thêm</span>
            <i className="fa-solid fa-chevron-right"></i>
          </Link>
        </div>
        <div className="top-brands_slider">
          <div className="grid grid-cols-4 gap-4">
            <div className="top-brands_card">
              <div className="skeleton skeleton-brand-img"></div>
              <div className="mx-auto mt-2 skeleton skeleton-text w-50"></div>
            </div>
            <div className="top-brands_card">
              <div className="skeleton skeleton-brand-img"></div>
              <div className="mx-auto mt-2 skeleton skeleton-text w-50"></div>
            </div>
            <div className="top-brands_card">
              <div className="skeleton skeleton-brand-img"></div>
              <div className="mx-auto mt-2 skeleton skeleton-text w-50"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="for-user">
        <div className="for-user_header">
          <h1>
            DÀNH CHO <span className="for-user_color">BẠN</span>
          </h1>
          <Link href="/search" className="for-user_more">
            <span>Xem thêm</span>
            <i className="fa-solid fa-chevron-right"></i>
          </Link>
        </div>
        <div className="for-user_body">
          <div className="grid grid-cols-3 gap-3">
            <div className="product-card">
              <div className="product-card_image skeleton skeleton-product-img"></div>
              <div className="product-card_info">
                <div className="skeleton skeleton-text"></div>
                <div className="mt-2 skeleton skeleton-new-price"></div>
                <div className="mt-2 skeleton skeleton-old-price"></div>
                <div className="mt-2 skeleton skeleton-save-price"></div>
              </div>
            </div>
            <div className="product-card">
              <div className="product-card_image skeleton skeleton-product-img"></div>
              <div className="product-card_info">
                <div className="skeleton skeleton-text"></div>
                <div className="mt-2 skeleton skeleton-new-price"></div>
                <div className="mt-2 skeleton skeleton-old-price"></div>
                <div className="mt-2 skeleton skeleton-save-price"></div>
              </div>
            </div>
            <div className="product-card">
              <div className="product-card_image skeleton skeleton-product-img"></div>
              <div className="product-card_info">
                <div className="skeleton skeleton-text"></div>
                <div className="mt-2 skeleton skeleton-new-price"></div>
                <div className="mt-2 skeleton skeleton-old-price"></div>
                <div className="mt-2 skeleton skeleton-save-price"></div>
              </div>
            </div>
            <div className="product-card">
              <div className="product-card_image skeleton skeleton-product-img"></div>
              <div className="product-card_info">
                <div className="skeleton skeleton-text"></div>
                <div className="mt-2 skeleton skeleton-new-price"></div>
                <div className="mt-2 skeleton skeleton-old-price"></div>
                <div className="mt-2 skeleton skeleton-save-price"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Loading;

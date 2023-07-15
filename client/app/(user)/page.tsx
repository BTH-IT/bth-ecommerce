import Loading from './loading';
import '../../css/pages/home.css';
import brandService from '@/services/brandService';
import BrandList from './_components/BrandList';
import { Suspense } from 'react';
import bannerService from '@/services/bannerService';
import BannerSlider from './_components/BannerSlider';
import Link from 'next/link';
import HotDealSlider from './_components/HotDealSlider';
import productService from '@/services/productService';
import ProductGrid from '@/components/ProductGrid';
import BrandSlider from './_components/BrandSlider';

export default async function Home() {
  const brandList = await brandService.getAll();
  const bannerList = await bannerService.getAll();
  const bestsellerList = await productService.getAll({ sort: 'hot' });
  const hotDealList = await productService.getAll({ sale: true });
  const forUserList = await productService.getAll();

  return (
    <Suspense fallback={<Loading></Loading>}>
      <section className="container">
        <section className="main">
          <ul className="brand">
            <BrandList brandList={brandList}></BrandList>
          </ul>

          <div className="slider">
            <BannerSlider bannerList={bannerList}></BannerSlider>
          </div>
        </section>

        <section className="deal">
          <div className="deal-header">
            <h1>
              <span className="deal-color">DEAL HOT</span> CHO BẠN
            </h1>
            <Link href="/search" className="deal-more">
              <span>Xem thêm</span>
              <i className="bi bi-caret-right-fill"></i>
            </Link>
          </div>
          <div className="deal-slider">
            <HotDealSlider hotDealList={hotDealList}></HotDealSlider>
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
              <i className="bi bi-caret-right-fill"></i>
            </Link>
          </div>
          <div className="bestseller_body">
            <ProductGrid productList={bestsellerList}></ProductGrid>
          </div>
        </section>

        <section className="top-brands">
          <div className="top-brands_header">
            <h1>
              <span className="top-brands_color">THƯƠNG HIỆU ĐIỆN TỬ </span>{' '}
              HÀNG ĐẦU
            </h1>
            <Link href="/search" className="top-brands_more">
              <span>Xem thêm</span>
              <i className="bi bi-caret-right-fill"></i>
            </Link>
          </div>
          <div className="top-brands_slider">
            <BrandSlider brandList={brandList}></BrandSlider>
          </div>
        </section>

        <section className="for-user">
          <div className="for-user_header">
            <h1>
              DÀNH CHO <span className="for-user_color">BẠN</span>
            </h1>
            <Link href="/search" className="for-user_more">
              <span>Xem thêm</span>
              <i className="bi bi-caret-right-fill"></i>
            </Link>
          </div>
          <div className="for-user_body">
            <ProductGrid productList={forUserList}></ProductGrid>
          </div>
        </section>
      </section>
    </Suspense>
  );
}

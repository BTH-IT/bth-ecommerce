import productService from '@/services/productService';
import Link from 'next/link';
import React from 'react';
import '../../../../css/pages/product-detail.css';
import ProductSlider from './_components/ProductSlider';
import { Metadata } from 'next';
import ImagesProduct from './_components/ImagesProduct';
import DescriptionProduct from './_components/DescriptionProduct';
import InforProduct from './_components/InforProduct';
import AmountAndPriceProduct from './_components/AmountAndPriceProduct';
import AddProductToCart from './_components/AddProductToCart';

export async function generateMetadata({
  params,
}: {
  params: { productId: string };
}): Promise<Metadata> {
  const id = params.productId;
  const product = await productService.getById(id);

  return {
    title: product.productName,
    icons: {
      icon: '/logo.svg',
      apple: '/logo.svg',
    },
  };
}

const ProductDetailPage = async ({
  params,
}: {
  params: { productId: string };
}) => {
  const { productId } = params;
  const product = await productService.getById(productId);
  const productList = await productService.getAll();

  return (
    <section className="container product">
      <div className="product__link">
        <Link href="/">Trang chủ </Link>
        <span id="seperate">/</span>
        <span id="product__nav-name">{product.productName}</span>
      </div>
      <div className="product__info">
        <div className="grid grid-cols-4 gap-6 product__info-row">
          <ImagesProduct imageList={product.imageUrlList}></ImagesProduct>
          <div className="col-span-3 p-2 product__info-container">
            <AmountAndPriceProduct product={product}></AmountAndPriceProduct>
            <div className="p-0">
              <AddProductToCart product={product}></AddProductToCart>
            </div>
          </div>
        </div>
      </div>
      <div className="product__detail">
        <div className="product__detail-container">
          <div className="grid grid-cols-3 gap-4 p-4">
            <div className="col-span-2">
              <DescriptionProduct
                description={product.description}
              ></DescriptionProduct>
            </div>
            <div className="product__detail-table">
              <InforProduct product={product}></InforProduct>
            </div>
          </div>
        </div>
      </div>
      <div className="similar-product">
        <div className="similar-product-title">
          <h4>Các sản phẩm liên quan có thể bạn sẽ thích</h4>
        </div>
        <div className="product-slider">
          <ProductSlider productList={productList}></ProductSlider>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailPage;

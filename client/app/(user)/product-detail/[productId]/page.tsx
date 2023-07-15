import productService from '@/services/productService';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import '../../../../css/pages/product-detail.css';
import { convertCurrency } from '@/utils/contains';
import Button from '@/components/Button';
import ProductSlider from './_components/ProductSlider';
import { Metadata } from 'next';

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: { productId: string };
}): Promise<Metadata> {
  // read route params
  const id = params.productId;

  // fetch data
  const product = await productService.getById(id);

  return {
    title: product.productName,
  };
}

export async function generateStaticParams() {
  const productList = await productService.getAll();

  return productList.map((product) => ({
    productId: product._id,
  }));
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
          <div className="product__info-img_container">
            <div className="product__info-img_main-img zoom">
              <Image
                className="main-img"
                src="https://images.unsplash.com/photo-1688993536536-df108751b415?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="image-main"
                width={100000}
                height={100000}
              ></Image>
              <Image
                src="https://images.unsplash.com/photo-1688993536536-df108751b415?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="sf314.webp"
                id="imgZoom"
                width={100000}
                height={100000}
              ></Image>
            </div>
            <div className="product__info-img_sub-img">
              <Image
                className="sub-img active"
                src="https://images.unsplash.com/photo-1688993536536-df108751b415?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="image-main"
                width={100000}
                height={100000}
              ></Image>
              <Image
                className="sub-img"
                src="https://images.unsplash.com/photo-1688993536536-df108751b415?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="image-main"
                width={100000}
                height={100000}
              ></Image>
              <Image
                className="sub-img"
                src="https://images.unsplash.com/photo-1688993536536-df108751b415?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="image-main"
                width={100000}
                height={100000}
              ></Image>
              <Image
                className="sub-img"
                src="https://images.unsplash.com/photo-1688993536536-df108751b415?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="image-main"
                width={100000}
                height={100000}
              ></Image>
            </div>
          </div>
          <div className="col-span-3 p-2 product__info-container">
            <div
              className={`product__info-status ${
                product.remain <= 0 ? 'empty' : ''
              }`}
            >
              {product.remain > 0 ? 'CÒN HÀNG' : 'HẾT HÀNG'}
            </div>
            <div className="product__info-name">{product.productName}</div>
            <div className="product__info-brand">
              Thương hiệu {product.brand.name.toUpperCase()} | Mã sản phẩm:{' '}
              {product._id}
            </div>
            {product.remain > 0 && product.remain <= 10 && (
              <div className="product__info-warning-amount">
                {product.remain} sản phẩm
              </div>
            )}
            <div className="product__info-price_container">
              {product.salePercent > 0 ? (
                <>
                  <div className="product__info-price">
                    {convertCurrency(
                      product.originPrice -
                        (product.originPrice * product.salePercent) / 100,
                    )}
                  </div>
                  <div className="product__info-cost_container">
                    <span className="product__info-cost">
                      {convertCurrency(product.originPrice)}
                    </span>
                    <span className="product__info-discount">
                      -{product.salePercent}%
                    </span>
                  </div>
                </>
              ) : (
                <div className="product__info-price">
                  {convertCurrency(product.originPrice)}
                </div>
              )}
            </div>
            <div className="p-0">
              <div className="grid grid-cols-2 gap-2 product__info-btn_container">
                <Button type="button" className="buy-btn col-md-4">
                  MUA NGAY
                </Button>
                <Button type="button" className="addToCart-btn col-md">
                  THÊM VÀO GIỎ HÀNG
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="product__detail">
        <div className="container product__detail-container">
          <div className="grid grid-cols-3 gap-4 p-4">
            <div className="col-span-2">
              <h4>Mô tả sản phẩm</h4>
              <div className="product__detail-description">
                {product.description}
              </div>
            </div>
            <div className="product__detail-table">
              <h4>Thông tin chi tiết</h4>
              <table>
                <tbody>
                  <tr>
                    <td>Thương hiệu</td>
                    <td>{product.brand.name}</td>
                  </tr>
                  <tr>
                    <td>Bảo hành</td>
                    <td>{product.warranteeYear}</td>
                  </tr>
                  <tr>
                    <td>Series laptop</td>
                    <td>{product.seriesLaptop}</td>
                  </tr>
                  <tr>
                    <td>Màu sắc</td>
                    <td>{product.color}</td>
                  </tr>
                  <tr>
                    <td>Thế hệ CPU</td>
                    <td>{product.generateCpu}</td>
                  </tr>
                  <tr>
                    <td>CPU</td>
                    <td>{product.cpu}</td>
                  </tr>
                  <tr>
                    <td>Chip đồ họa</td>
                    <td>{product.chip}</td>
                  </tr>
                  <tr>
                    <td>Tên RAM</td>
                    <td>{product.ramName}</td>
                  </tr>
                  <tr>
                    <td>Dung lượng RAM</td>
                    <td>{product.ramSize} GB</td>
                  </tr>
                  <tr>
                    <td>Màn hình</td>
                    <td>{product.screen}</td>
                  </tr>
                  <tr>
                    <td>Tên thiết bị lưu trữ</td>
                    <td>{product.storageName}</td>
                  </tr>
                  <tr>
                    <td>Dung lượng lưu trữ</td>
                    <td>{product.storageSize} GB</td>
                  </tr>
                  <tr>
                    <td>Số cổng lưu trữ tối đa</td>
                    <td>{product.storagePortMaximum}</td>
                  </tr>
                  <tr>
                    <td>Kiểu khe M.2 hỗ trợ</td>
                    <td>{product.supportM2slotType}</td>
                  </tr>
                  <tr>
                    <td>Tên cổng xuất hình</td>
                    <td>{product.screenOutputPortName}</td>
                  </tr>
                  <tr>
                    <td>Số cổng xuất hình</td>
                    <td>{product.screenOutputPortNum}</td>
                  </tr>

                  <tr>
                    <td>Kết nối không dây</td>
                    <td>{product.bluetooth}</td>
                  </tr>
                  <tr>
                    <td>Bàn phím</td>
                    <td>{product.keyboard}</td>
                  </tr>
                  <tr>
                    <td>Hệ điều hành</td>
                    <td>{product.operationSystem}</td>
                  </tr>
                  <tr>
                    <td>Kích thước</td>
                    <td>{product.size} cm</td>
                  </tr>
                  <tr>
                    <td>Pin</td>
                    <td>{product.pin}</td>
                  </tr>
                  <tr>
                    <td>Khối lượng</td>
                    <td>{product.weight} kg</td>
                  </tr>
                  <tr>
                    <td>Đèn LED trên máy</td>
                    <td>{product.led ? 'Có' : 'Không'}</td>
                  </tr>
                  <tr>
                    <td>Màn hình cảm ứng</td>
                    <td>{product.touchScreen ? 'Có' : 'Không'}</td>
                  </tr>
                </tbody>
              </table>
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

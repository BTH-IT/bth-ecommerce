import Link from 'next/link';
import React from 'react';
import '../../../css/pages/cart.css';
import Image from 'next/image';
import TableBodyCart from './_components/TableBodyCart';

const CartPage = () => {
  let cartList: any[] = [];
  if (typeof window !== 'undefined') {
    cartList = JSON.parse(window.localStorage.getItem('cartList') || '[]');
  }

  return (
    <section className="container">
      <div className="cart-link">
        <Link href="">Trang chủ </Link>
        <span id="seperate">/</span>
        <span> Giỏ hàng</span>
      </div>
      {cartList.length > 0 ? (
        <div className="grid grid-cols-12 gap-3 cart-row">
          <div className="col-span-8">
            <div className="detele-row row">
              <div className="cart-title-delete">
                <div className="cart-title">
                  <h4>Giỏ hàng</h4>
                </div>
                <div className="cart-delete">
                  <span className="delete">Xoá tất cả</span>
                </div>
              </div>
            </div>
            <div className="table-row row">
              <div className="cart-table_container table-responsive-xxl text-nowrap">
                <table className="table cart-table table-xxl table-borderless">
                  <thead className="table-head">
                    <tr className="table-head_row">
                      <th className="table-head_item">STT</th>
                      <th className="table-head_item">Brand</th>
                      <th className="table-head_item">Đơn giá</th>
                      <th className="table-head_item">Số lượng</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    <TableBodyCart cartList={cartList}></TableBodyCart>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 col-span-2 gap-3">
            <div className="total-container">
              <div className="total-title">
                <h5>Thành tiền</h5>
              </div>
              <div className="pre-price_container">
                <div className="pre-price_title">Tổng tạm tính</div>
                <div className="pre-price">0 VND</div>
              </div>
              <div className="total-price_container">
                <div className="total-price_title">Thành tiền</div>
                <div className="total-price">0 VND</div>
              </div>
              <div className="purchase-btn_container">
                <button className="purchase-btn">THANH TOÁN</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-product-container">
          <Image
            src="/empty_cart.png"
            alt={'empty cart'}
            width={100000}
            height={10000}
          />
          <p className="no-product-info">Giỏ hàng chưa có sản phẩm nào</p>
          <Link href="/">
            <button type="button" className="no-product-btn">
              MUA SẮM NGAY
            </button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default CartPage;

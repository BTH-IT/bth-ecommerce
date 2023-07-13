"use client";

import React, { useState } from "react";
import "../css/layouts/header.css";
import Link from "next/link";
import Image from "next/image";
import SidebarMobile from "./SidebarMobile";

const Header = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [cartTitle, setCartTitle] = useState("(0) sản phẩm");
  const [isEmptyCart, setIsEmptyCart] = useState(true);
  return (
    <>
      <header className="header-container">
        <div className="header">
          <Link className="logo" href="/">
            <span className="logo-img">
              <svg
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.8">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.4674 1.91309H37.1848C40.9487 1.91309 44 5.28555 44 9.44569V34.5544C44 38.7145 40.9487 42.087 37.1848 42.087H14.4674C10.7034 42.087 7.65216 38.7145 7.65216 34.5544L7.65216 9.44569C7.65216 5.28555 10.7034 1.91309 14.4674 1.91309Z"
                    fill="#0D6EFD"
                    fillOpacity="0.2"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.13044 1.91309H32.0435C36.0055 1.91309 39.2174 5.28555 39.2174 9.44569V34.5544C39.2174 38.7145 36.0055 42.087 32.0435 42.087H8.13044C4.1684 42.087 0.956527 38.7145 0.956528 34.5544L0.956528 9.44569C0.956527 5.28555 4.1684 1.91309 8.13044 1.91309Z"
                    fill="#0D6EFD"
                  />
                  <g opacity="0.7">
                    <path
                      opacity="0.3"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.2902 18.3562H14.3097C14.2591 18.3562 14.1842 18.4265 14.1813 18.473L13.4589 30.1476L26.9548 30.1451L26.2253 18.473C26.2225 18.4283 26.1457 18.3562 26.0969 18.3562H25.1164V20.3214C25.1164 20.8641 24.6765 21.3041 24.1338 21.3041C23.5911 21.3041 23.1512 20.8641 23.1512 20.3214V18.3562H17.2554V20.3214C17.2554 20.8641 16.8155 21.3041 16.2728 21.3041C15.7301 21.3041 15.2902 20.8641 15.2902 20.3214V18.3562Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20.2033 11.4783C22.9153 11.4783 25.1164 13.6796 25.1164 16.3891L26.0969 16.3914C27.1835 16.3914 28.1192 17.2704 28.1867 18.3508L28.9244 30.1539C28.9921 31.2361 28.1698 32.1133 27.0865 32.1133H13.3201C12.2374 32.1133 11.4146 31.2344 11.4821 30.1539L12.2198 18.3508C12.2875 17.2686 13.2213 16.3914 14.3096 16.3914H15.2902C15.2902 13.6781 17.493 11.4783 20.2033 11.4783ZM23.1511 16.3915C23.1511 14.765 21.8299 13.4436 20.2033 13.4436C18.5778 13.4436 17.2554 14.7642 17.2554 16.3892L23.1511 16.3915ZM15.2902 18.3566H14.3096C14.2591 18.3566 14.1842 18.4269 14.1813 18.4733L13.4589 30.148L26.9548 30.1455L26.2253 18.4733C26.2225 18.4286 26.1457 18.3566 26.0969 18.3566H25.1164V20.3218C25.1164 20.8645 24.6765 21.3044 24.1338 21.3044C23.5911 21.3044 23.1512 20.8645 23.1512 20.3218V18.3566H17.2554V20.3218C17.2554 20.8645 16.8155 21.3044 16.2728 21.3044C15.7301 21.3044 15.2902 20.8645 15.2902 20.3218V18.3566Z"
                      fill="white"
                    />
                  </g>
                </g>
              </svg>
            </span>
            <span className="logo-text">
              <svg
                width="78"
                height="22"
                viewBox="0 0 78 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.213623 20.8061H9.10297C13.7762 20.8061 16.2652 18.3679 16.2652 15.056C16.2652 11.9778 14.0607 10.1186 11.6936 10.0069V9.80368C13.8575 9.31603 15.4525 7.78199 15.4525 5.33361C15.4525 2.21472 13.1362 0 8.54421 0H0.213623V20.8061ZM4.61258 17.2098V11.6831H8.30039C10.4135 11.6831 11.7241 12.9022 11.7241 14.6192C11.7241 16.1837 10.6573 17.2098 8.19879 17.2098H4.61258ZM4.61258 8.70648V3.55574H7.95497C9.90555 3.55574 11.0129 4.5615 11.0129 6.06507C11.0129 7.71087 9.67188 8.70648 7.8737 8.70648H4.61258Z"
                  fill="#8CB7F5"
                />
                <path
                  d="M18.5182 20.8061H22.846V11.9778C22.846 10.0577 24.248 8.73696 26.1579 8.73696C26.7573 8.73696 27.5802 8.83855 27.9866 8.97062V5.13042C27.6005 5.03899 27.0621 4.97803 26.6253 4.97803C24.8779 4.97803 23.4454 5.99396 22.8765 7.92422H22.7139V5.20154H18.5182V20.8061Z"
                  fill="#8CB7F5"
                />
                <path
                  d="M33.6988 21.1008C36.0049 21.1008 37.4983 20.095 38.2603 18.6422H38.3822V20.8061H42.4865V10.2812C42.4865 6.56288 39.3371 4.99835 35.8627 4.99835C32.1241 4.99835 29.6655 6.78638 29.0661 9.63097L33.0689 9.95607C33.3635 8.91982 34.288 8.15788 35.8424 8.15788C37.3155 8.15788 38.1587 8.8995 38.1587 10.1796V10.2405C38.1587 11.2463 37.092 11.3784 34.3794 11.6425C31.291 11.927 28.5175 12.9632 28.5175 16.4478C28.5175 19.5362 30.7221 21.1008 33.6988 21.1008ZM34.9382 18.1139C33.6073 18.1139 32.6524 17.4942 32.6524 16.3056C32.6524 15.0865 33.6581 14.4871 35.182 14.2737C36.1268 14.1417 37.671 13.9182 38.1891 13.5728V15.2287C38.1891 16.8644 36.838 18.1139 34.9382 18.1139Z"
                  fill="#8CB7F5"
                />
                <path
                  d="M49.6438 11.7847C49.654 9.7732 50.8528 8.59473 52.6002 8.59473C54.3374 8.59473 55.3838 9.73256 55.3736 11.6425V20.8061H59.7015V10.8704C59.7015 7.23339 57.568 4.99835 54.3171 4.99835C52.0008 4.99835 50.3245 6.13619 49.6235 7.95469H49.4406V5.20154H45.316V20.8061H49.6438V11.7847Z"
                  fill="#8CB7F5"
                />
                <path
                  d="M68.3344 21.0601C70.8539 21.0601 72.1645 19.6074 72.7639 18.307H72.9467V20.8061H77.2136V0H72.8959V7.82262H72.7639C72.1848 6.55272 70.9352 4.99835 68.3243 4.99835C64.9006 4.99835 62.0052 7.66008 62.0052 13.0242C62.0052 18.246 64.7787 21.0601 68.3344 21.0601ZM69.7059 17.6161C67.5826 17.6161 66.4245 15.7265 66.4245 13.0038C66.4245 10.3015 67.5623 8.44234 69.7059 8.44234C71.8089 8.44234 72.9874 10.2202 72.9874 13.0038C72.9874 15.7875 71.7886 17.6161 69.7059 17.6161Z"
                  fill="#8CB7F5"
                />
              </svg>
            </span>
          </Link>
          <div className="search-container">
            <div className="search-box">
              <input
                type="text"
                className="header-input"
                placeholder="Search"
              />
              <ul className="search-suggest"></ul>
              <button type="button" className="btn primary btn-header">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
          <div className="action">
            {isLogged ? (
              <div className="action-container logged">
                <div className="action-logged">
                  <span className="action-img">
                    <Image
                      src="https://server.bthung313.site/images/avatar.jpg"
                      alt=""
                      width={32}
                      height={32}
                    />
                  </span>
                  <span className="action-title">
                    Xin chào, <br />
                    <p>Hung</p>
                  </span>
                </div>
                <div className="action-hover">
                  <div className="action-logged_container">
                    <ul className="action-logged_list">
                      <li className="action-logged_item">
                        <Link href="/profile">
                          <i className="bi bi-person-circle"></i>
                          <span>Thông tin tài khoản</span>
                        </Link>
                      </li>
                      <li className="action-logged_item">
                        <Link href="/change-password">
                          <i className="bi bi-unlock"></i>
                          <span>Cập nhật mật khẩu mới</span>
                        </Link>
                      </li>
                      <li className="action-logged_item">
                        <Link href="/history">
                          <i className="bi bi-file-earmark-spreadsheet"></i>
                          <span>Quản lý đơn hàng</span>
                        </Link>
                      </li>
                    </ul>
                    <div className="action-logged_bottom">
                      <Link href="/login" className="btn primary logout">
                        Đăng xuất
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link className="action-link auth" href="/login">
                <span className="action-icon">
                  <i className="bi bi-person-circle"></i>
                </span>
                <span className="action-title">
                  Đăng nhập
                  <br />
                  Đăng kí
                </span>
              </Link>
            )}

            <div className="action-container">
              <Link className="action-link cart" href="/cart">
                <span className="action-icon">
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    fontSize="36"
                    height="36"
                    width="36"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3 3.75C3 3.33579 3.33579 3 3.75 3H6.00033C6.41455 3 6.75033 3.33579 6.75033 3.75V6.00035H18.7522C18.9832 6.00035 19.2012 6.10676 19.3434 6.28879C19.4855 6.47083 19.5358 6.7082 19.4798 6.93225L17.9796 12.9331C17.8961 13.267 17.5961 13.5012 17.252 13.5012H6.75033V14.2516C6.75033 14.4505 6.82937 14.6413 6.97007 14.782C7.11076 14.9227 7.30158 15.0018 7.50055 15.0018H19.5023C19.9165 15.0018 20.2523 15.3376 20.2523 15.7518C20.2523 16.166 19.9165 16.5018 19.5023 16.5018H7.50055C6.90376 16.5018 6.33141 16.2647 5.90941 15.8427C5.48741 15.4207 5.25033 14.8483 5.25033 14.2516V12.7544C5.25033 12.7534 5.25033 12.7523 5.25033 12.7512C5.25033 12.7502 5.25033 12.7491 5.25033 12.748V6.75355C5.25033 6.75249 5.25033 6.75142 5.25033 6.75035C5.25033 6.74929 5.25033 6.74822 5.25033 6.74715V4.5H3.75C3.33579 4.5 3 4.16421 3 3.75ZM6.75033 7.50035V12.0012H16.6664L17.7916 7.50035H6.75033ZM6.0006 19.5024C6.0006 18.6739 6.67222 18.0023 7.50071 18.0023C8.3292 18.0023 9.00082 18.6739 9.00082 19.5024C9.00082 20.3309 8.3292 21.0025 7.50071 21.0025C6.67222 21.0025 6.0006 20.3309 6.0006 19.5024ZM18.0021 18.0023C17.1736 18.0023 16.502 18.6739 16.502 19.5024C16.502 20.3309 17.1736 21.0025 18.0021 21.0025C18.8306 21.0025 19.5022 20.3309 19.5022 19.5024C19.5022 18.6739 18.8306 18.0023 18.0021 18.0023Z"
                      fill="#82869E"
                    ></path>
                  </svg>
                </span>
                <span className="action-title cart">
                  <p>Giỏ hàng của bạn</p>
                  <p>{cartTitle}</p>
                </span>
              </Link>
              <div className="action-hover">
                {isEmptyCart ? (
                  <div className="action-cart_empty">
                    <div className="action-cart_empty-image">
                      <Image
                        src="/empty_cart.png"
                        alt="empty-cart"
                        width={150}
                        height={150}
                      />
                    </div>
                    <p>Giỏ hàng chưa có sản phẩm</p>
                    <Link href="/" className="btn primary">
                      Mua sắm ngay
                    </Link>
                  </div>
                ) : (
                  <div className="action-cart_container">
                    <ul className="action-cart_top"></ul>
                    <div className="action-cart_bottom">
                      <div className="action-cart_total">
                        <p></p>
                        <span></span>
                      </div>
                      <Link href="/cart" className="btn primary">
                        Xem giỏ hàng
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="action-bars">
              <i className="bi bi-list"></i>
            </div>
          </div>
        </div>
      </header>

      <SidebarMobile></SidebarMobile>
    </>
  );
};

export default Header;

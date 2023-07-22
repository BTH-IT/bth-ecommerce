'use client';

import React, {
  ChangeEvent,
  LegacyRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useAppSelector } from '@/redux/hooks';
import { authActions, selectAuth } from '@/redux/features/authSlice';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';
import Link from 'next/link';
import SidebarMobile from './SidebarMobile';
import Image from 'next/image';
import { CartType } from '@/types/cart';
import { convertCurrency } from '@/utils/contains';
import { ProductType, SuggestProductType } from '@/types/product';
import { searchingSuggest } from '@/utils/serverActions';
import { useRouter } from 'next/navigation';
import { useClickOutSide } from '@/hooks/useClickOutSide';

const Header = () => {
  const isLogged = Boolean(useAppSelector(selectAuth).accessToken);
  const user: any = useAppSelector(selectAuth).user;
  const account: any = useAppSelector(selectAuth).newAccount;
  const cartList = useAppSelector(selectAuth).cartList;
  const dispatch = useDispatch();

  const [showSidebarMobile, setShowSidebarMobile] = useState(false);
  const [suggestList, setSuggestList] = useState<SuggestProductType[] | []>([]);
  const router = useRouter();
  const { elementRef, setShow, show } = useClickOutSide();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  const handleChangeSearching = debounce(
    async (e: ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value.trim();

      if (!value) {
        setSuggestList([]);
        return;
      }
      const params = {
        search: {
          key: value,
        },
      };

      const productList: ProductType[] = await searchingSuggest(params);

      const suggestProductList = productList.map((product) => {
        return {
          _id: product._id,
          productName: product.productName,
        };
      });

      setSuggestList(suggestProductList);
      if (suggestProductList.length > 0) {
        setShow(true);
      }
    },
    200,
  );

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      search: { value: string };
    };

    if (target.search.value) router.push(`/search?key=${target.search.value}`);
  };

  return (
    mounted && (
      <>
        <header className="header-container">
          <div className="container header">
            <Link className="logo" href="/">
              <span className="logo-img">
                <Image
                  src="/logo.svg"
                  alt="logo"
                  width={40}
                  height={40}
                ></Image>
              </span>
              <span className="logo-text">
                <Image
                  src="/logo-text.svg"
                  alt="logo"
                  width={75}
                  height={24}
                ></Image>
              </span>
            </Link>
            <div className="search-container" onSubmit={handleSubmit}>
              <form
                className="search-box"
                ref={elementRef as LegacyRef<HTMLFormElement> | undefined}
              >
                <input
                  type="text"
                  name="search"
                  className="header-input"
                  placeholder="Searching..."
                  onChange={handleChangeSearching}
                />
                {suggestList.length > 0 && show && (
                  <ul className="search-suggest">
                    {suggestList.map((suggest: SuggestProductType) => (
                      <li
                        className="search-suggest_item"
                        key={suggest._id}
                        onClick={() => setShow(!show)}
                      >
                        <Link
                          href={`/product-detail/${suggest._id}`}
                          className="search-suggest_item-link"
                        >
                          <i className="bi bi-search"></i>
                          <span>{suggest.productName}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                <button type="submit" className="btn primary btn-header">
                  <i className="bi bi-search"></i>
                </button>
              </form>
            </div>
            <div className="action">
              {isLogged ? (
                <div className="action-container logged">
                  <div className="action-logged">
                    <span className="action-img">
                      <Image
                        src={account?.picture}
                        alt="avatar"
                        width={32}
                        height={32}
                      />
                    </span>
                    <span className="action-title">
                      Xin chào, <br />
                      <p>{user?.fullname ? user?.fullname : 'fullname'}</p>
                    </span>
                  </div>
                  <div className="action-hover">
                    <div className="action-logged_container">
                      <ul className="action-logged_list">
                        <li className="action-logged_item">
                          <Link href="/profile">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-7 h-7"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            <span>Thông tin tài khoản</span>
                          </Link>
                        </li>
                        <li className="action-logged_item">
                          <Link href="/change-password">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-7 h-7"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                              />
                            </svg>
                            <span>Cập nhật mật khẩu mới</span>
                          </Link>
                        </li>
                        <li className="action-logged_item">
                          <Link href="/history">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-7 h-7"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
                              />
                            </svg>
                            <span>Quản lý đơn hàng</span>
                          </Link>
                        </li>
                      </ul>
                      <div
                        className="action-logged_bottom"
                        onClick={handleLogout}
                      >
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-7 h-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
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
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-7 h-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                  </span>
                  <span className="action-title cart">
                    <p>Giỏ hàng của bạn</p>
                    <p>{`(${cartList.length}) sản phẩm`}</p>
                  </span>
                </Link>
                <div className="action-hover">
                  {cartList.length <= 0 ? (
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
                      <ul className="action-cart_top">
                        {cartList.map((cart: CartType) => (
                          <li className="action-cart_item" key={cart._id}>
                            <div className="action-cart_item-image">
                              <Image
                                src="https://server.bthung313.site/images/sf314.webp"
                                alt={cart.productName}
                                width={73}
                                height={73}
                              />
                            </div>
                            <div className="action-cart_item-info">
                              <Link href={`/product-detail/${cart._id}`}>
                                {cart.productName}
                              </Link>
                              <p>Số lượng: {cart.amount}</p>
                              <h4>
                                {convertCurrency(
                                  cart.originPrice -
                                    (cart.originPrice * cart.salePercent) / 100,
                                )}
                              </h4>
                            </div>
                          </li>
                        ))}
                      </ul>
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

              <div
                className="action-bars"
                onClick={() => {
                  console.log(showSidebarMobile);
                  setShowSidebarMobile(!showSidebarMobile);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </div>
            </div>
          </div>
        </header>

        <SidebarMobile
          toggle={showSidebarMobile}
          cartTitle={`(${cartList.length}) sản phẩm`}
          handleLogout={handleLogout}
        ></SidebarMobile>
      </>
    )
  );
};

export default Header;

import React, { Suspense } from 'react';
import '../../../css/pages/search.css';
import Loading from '../loading';
import productService from '@/services/productService';
import ProductGrid from '@/components/ProductGrid';
import FilterList from './_components/FilterList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BTH Ecommerce | Search',
  description: 'BTH Ecommerce | Search',
};

const Search = async () => {
  const productList = await productService.getAll();
  return (
    <Suspense fallback={<Loading></Loading>}>
      <section className="container">
        <div className="search">
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-3">
              <div className="search-left">
                <div className="price-range_container">
                  <h4>Khoảng giá</h4>
                  <div className="price-input">
                    <div className="field">
                      <input
                        type="text"
                        className="input-min"
                        value="0 VNĐ"
                        disabled
                      />
                    </div>
                    <div className="separator">-</div>
                    <div className="field">
                      <input
                        type="text"
                        className="input-max"
                        value="0 VNĐ"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="price-slider">
                    <div className="price-progress"></div>
                  </div>
                  <div className="price-range-input">
                    <input
                      type="range"
                      className="range-min"
                      min="0"
                      step="10000"
                    />
                    <input
                      type="range"
                      className="range-max"
                      min="0"
                      step="10000"
                    />
                  </div>
                </div>
                <div className="search-dropdown_container pc">
                  <FilterList productList={productList}></FilterList>
                </div>
              </div>
            </div>
            <div className="col-span-9">
              <div className="search-right">
                <div className="search-filter pc">
                  <h5>Sắp xếp theo</h5>
                  <label
                    htmlFor="sale"
                    className="search-filter_item"
                    data-value="sale"
                  >
                    <div></div>
                    <span>
                      <i className="fa-solid fa-check"></i>
                    </span>
                    Khuyến mãi tốt nhất
                  </label>
                  <label
                    htmlFor="bestseller"
                    className="search-filter_item"
                    data-value="bestseller"
                  >
                    <div></div>
                    <span>
                      <i className="fa-solid fa-check"></i>
                    </span>
                    Bán chạy
                  </label>
                  <label
                    htmlFor="new"
                    className="search-filter_item"
                    data-value="new"
                  >
                    <div></div>
                    <span>
                      <i className="fa-solid fa-check"></i>
                    </span>
                    Mới về
                  </label>
                  <label
                    htmlFor="desc"
                    className="search-filter_item"
                    data-value="desc"
                  >
                    <div></div>
                    <span>
                      <i className="fa-solid fa-check"></i>
                    </span>
                    Giá giảm dần
                  </label>
                  <label
                    htmlFor="asc"
                    className="search-filter_item"
                    data-value="asc"
                  >
                    <div></div>
                    <span>
                      <i className="fa-solid fa-check"></i>
                    </span>
                    Giá tăng dần
                  </label>
                </div>
                <div className="hidden search-filter d-md-none d-block mobile">
                  <div className="search-left d-block d-md-none">
                    <div className="price-range_container-mobile">
                      <h4>Khoảng giá</h4>
                      <div className="price-input-mobile">
                        <div className="field">
                          <input
                            type="text"
                            className="input-min-mobile"
                            value="0 VND"
                            disabled
                          />
                        </div>
                        <div className="separator">-</div>
                        <div className="field">
                          <input
                            type="text"
                            className="input-max-mobile"
                            value="0 VND"
                            disabled
                          />
                        </div>
                      </div>
                      <div className="price-slider-mobile">
                        <div className="price-progress-mobile"></div>
                      </div>
                      <div className="price-range-input-mobile">
                        <input
                          type="range"
                          className="range-min-mobile"
                          min="0"
                          step="1000"
                        />
                        <input
                          type="range"
                          className="range-max-mobile"
                          min="0"
                          step="1000"
                        />
                      </div>
                    </div>
                    <div className="search-dropdown_container mobile">
                      <label className="mt-3 search-dropdown_checkbox-item">
                        <div className="skeleton skeleton-text"></div>
                      </label>
                      <label className="mt-3 search-dropdown_checkbox-item">
                        <div className="skeleton skeleton-text"></div>
                      </label>
                      <label className="mt-3 search-dropdown_checkbox-item">
                        <div className="skeleton skeleton-text"></div>
                      </label>
                      <label className="mt-3 search-dropdown_checkbox-item">
                        <div className="skeleton skeleton-text"></div>
                      </label>
                      <label className="mt-3 search-dropdown_checkbox-item">
                        <div className="skeleton skeleton-text"></div>
                      </label>
                      <label className="mt-3 search-dropdown_checkbox-item">
                        <div className="skeleton skeleton-text"></div>
                      </label>
                      <label className="mt-3 search-dropdown_checkbox-item">
                        <div className="skeleton skeleton-text"></div>
                      </label>
                      <label className="mt-3 search-dropdown_checkbox-item">
                        <div className="skeleton skeleton-text"></div>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="search-product_container">
                  <div className="search-product">
                    <ProductGrid
                      productList={productList}
                      className="grid-cols-3 gap-3"
                    ></ProductGrid>
                  </div>
                  <nav
                    className="search-product_pagination"
                    aria-label="Page navigation example"
                  >
                    <ul className="pagination"></ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default Search;

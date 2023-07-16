import React from 'react';

const Loading = () => {
  return (
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
                  <div className="grid grid-cols-4 gap-3">
                    <a className="product-card">
                      <div className="product-card_image skeleton skeleton-product-img"></div>
                      <div className="product-card_info">
                        <div className="skeleton skeleton-text"></div>
                        <div className="mt-2 skeleton skeleton-new-price"></div>
                        <div className="mt-2 skeleton skeleton-old-price"></div>
                        <div className="mt-2 skeleton skeleton-save-price"></div>
                      </div>
                    </a>
                    <a className="product-card">
                      <div className="product-card_image skeleton skeleton-product-img"></div>
                      <div className="product-card_info">
                        <div className="skeleton skeleton-text"></div>
                        <div className="mt-2 skeleton skeleton-new-price"></div>
                        <div className="mt-2 skeleton skeleton-old-price"></div>
                        <div className="mt-2 skeleton skeleton-save-price"></div>
                      </div>
                    </a>
                    <a className="product-card">
                      <div className="product-card_image skeleton skeleton-product-img"></div>
                      <div className="product-card_info">
                        <div className="skeleton skeleton-text"></div>
                        <div className="mt-2 skeleton skeleton-new-price"></div>
                        <div className="mt-2 skeleton skeleton-old-price"></div>
                        <div className="mt-2 skeleton skeleton-save-price"></div>
                      </div>
                    </a>
                    <a className="product-card">
                      <div className="product-card_image skeleton skeleton-product-img"></div>
                      <div className="product-card_info">
                        <div className="skeleton skeleton-text"></div>
                        <div className="mt-2 skeleton skeleton-new-price"></div>
                        <div className="mt-2 skeleton skeleton-old-price"></div>
                        <div className="mt-2 skeleton skeleton-save-price"></div>
                      </div>
                    </a>
                    <a className="product-card">
                      <div className="product-card_image skeleton skeleton-product-img"></div>
                      <div className="product-card_info">
                        <div className="skeleton skeleton-text"></div>
                        <div className="mt-2 skeleton skeleton-new-price"></div>
                        <div className="mt-2 skeleton skeleton-old-price"></div>
                        <div className="mt-2 skeleton skeleton-save-price"></div>
                      </div>
                    </a>
                    <a className="product-card">
                      <div className="product-card_image skeleton skeleton-product-img"></div>
                      <div className="product-card_info">
                        <div className="skeleton skeleton-text"></div>
                        <div className="mt-2 skeleton skeleton-new-price"></div>
                        <div className="mt-2 skeleton skeleton-old-price"></div>
                        <div className="mt-2 skeleton skeleton-save-price"></div>
                      </div>
                    </a>
                    <a className="product-card">
                      <div className="product-card_image skeleton skeleton-product-img"></div>
                      <div className="product-card_info">
                        <div className="skeleton skeleton-text"></div>
                        <div className="mt-2 skeleton skeleton-new-price"></div>
                        <div className="mt-2 skeleton skeleton-old-price"></div>
                        <div className="mt-2 skeleton skeleton-save-price"></div>
                      </div>
                    </a>
                    <a className="product-card">
                      <div className="product-card_image skeleton skeleton-product-img"></div>
                      <div className="product-card_info">
                        <div className="skeleton skeleton-text"></div>
                        <div className="mt-2 skeleton skeleton-new-price"></div>
                        <div className="mt-2 skeleton skeleton-old-price"></div>
                        <div className="mt-2 skeleton skeleton-save-price"></div>
                      </div>
                    </a>
                    <a className="product-card">
                      <div className="product-card_image skeleton skeleton-product-img"></div>
                      <div className="product-card_info">
                        <div className="skeleton skeleton-text"></div>
                        <div className="mt-2 skeleton skeleton-new-price"></div>
                        <div className="mt-2 skeleton skeleton-old-price"></div>
                        <div className="mt-2 skeleton skeleton-save-price"></div>
                      </div>
                    </a>
                    <a className="product-card">
                      <div className="product-card_image skeleton skeleton-product-img"></div>
                      <div className="product-card_info">
                        <div className="skeleton skeleton-text"></div>
                        <div className="mt-2 skeleton skeleton-new-price"></div>
                        <div className="mt-2 skeleton skeleton-old-price"></div>
                        <div className="mt-2 skeleton skeleton-save-price"></div>
                      </div>
                    </a>
                    <a className="product-card">
                      <div className="product-card_image skeleton skeleton-product-img"></div>
                      <div className="product-card_info">
                        <div className="skeleton skeleton-text"></div>
                        <div className="mt-2 skeleton skeleton-new-price"></div>
                        <div className="mt-2 skeleton skeleton-old-price"></div>
                        <div className="mt-2 skeleton skeleton-save-price"></div>
                      </div>
                    </a>
                    <a className="product-card">
                      <div className="product-card_image skeleton skeleton-product-img"></div>
                      <div className="product-card_info">
                        <div className="skeleton skeleton-text"></div>
                        <div className="mt-2 skeleton skeleton-new-price"></div>
                        <div className="mt-2 skeleton skeleton-old-price"></div>
                        <div className="mt-2 skeleton skeleton-save-price"></div>
                      </div>
                    </a>
                  </div>
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
  );
};

export default Loading;

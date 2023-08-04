'use client';

import React, { useEffect, useState } from 'react';
import FilterSlider from './FilterSlider';
import { ProductType } from '@/types/product';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import productService from '@/services/productService';
import { handleRefreshToken, handleUpdateRouter } from '@/utils/clientActions';
import FilterList from './FilterList';
import SortLabel from './SortLabel';
import ProductGridSearch from '@/components/ProductGridSearch';

const sortList = [
  {
    title: 'Khuyến mãi tốt nhất',
    value: 'sale',
  },
  {
    title: 'Bán chạy nhất',
    value: 'bestseller',
  },
  {
    title: 'Mới về',
    value: 'newal',
  },
  {
    title: 'Giá giảm dần',
    value: 'desc-price',
  },
  {
    title: 'Giá tăng dần',
    value: 'asc-price',
  },
];

const SearchContainer = () => {
  const [productList, setProductList] = useState<ProductType[]>([]);
  const [sort, setSort] = useState<string>('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchProductList() {
      try {
        const success = await handleRefreshToken(dispatch);

        if (success) {
          const res = await productService.getAll();

          setProductList(res);
        } else {
          router.replace('/login');
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    }

    fetchProductList();
  }, []);

  useEffect(() => {
    if (
      !searchParams.has('page') ||
      (searchParams.has('page') && !searchParams.get('page')) ||
      (searchParams.has('page') && isNaN(Number(searchParams.get('page'))))
    ) {
      handleUpdateRouter('page', '1', searchParams, router);
    }
  }, [searchParams]);

  return (
    <div className="search">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-3">
          <div className="search-left">
            <div className="price-range_container">
              <h4>Khoảng giá</h4>
              {productList.length > 0 && (
                <FilterSlider productList={productList}></FilterSlider>
              )}
            </div>
            <div className="search-dropdown_container pc">
              {productList.length > 0 && (
                <FilterList productList={productList}></FilterList>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-9">
          <div className="search-right">
            <div className="search-filter pc">
              <h5>Sắp xếp theo</h5>
              {sortList.map((sortLabel) => (
                <SortLabel
                  setSort={setSort}
                  sort={sort}
                  title={sortLabel.title}
                  value={sortLabel.value}
                  key={sortLabel.value}
                ></SortLabel>
              ))}
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
            <ProductGridSearch total={productList.length}></ProductGridSearch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchContainer;

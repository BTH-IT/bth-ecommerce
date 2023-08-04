'use client';

import { ProductType } from '@/types/product';
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import {
  handleRefreshToken,
  handleSearchParamsToObject,
  handleUpdateRouter,
} from '@/utils/clientActions';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import productService from '@/services/productService';
import toast from 'react-hot-toast';
import { Pagination } from 'rsuite';
import NavLinkPagination from '@/app/(user)/search/_components/NavLinkPagination';

const ProductGridSearch = ({ total }: { total: number }) => {
  const [productList, setProductList] = useState<ProductType[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(
    Number(searchParams.get('page') || 1),
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchProductList() {
      try {
        const success = await handleRefreshToken(dispatch);

        if (success) {
          const res = await productService.getAll({
            ...handleSearchParamsToObject(searchParams),
          });

          setProductList(res);
        } else {
          router.replace('/login');
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    }

    fetchProductList();

    if (
      !searchParams.has('page') ||
      (searchParams.has('page') && !searchParams.get('page')) ||
      (searchParams.has('page') && isNaN(Number(searchParams.get('page'))))
    ) {
      handleUpdateRouter('page', '1', searchParams, router);
    } else {
      setPage(Number(searchParams.get('page')));
    }
  }, [searchParams]);

  return productList && productList.length > 0 ? (
    <div className="search-product_container">
      <div className="search-product">
        <div className={`grid grid-cols-3 gap-3`}>
          {productList.map((product) => (
            <ProductCard {...product} key={product._id}></ProductCard>
          ))}
        </div>
      </div>
      <Pagination
        prev
        last
        next
        first
        size="lg"
        linkAs={NavLinkPagination}
        total={total}
        limit={10}
        activePage={page}
        className="flex justify-center pb-5 mt-5"
      />
    </div>
  ) : (
    <></>
  );
};

export default ProductGridSearch;

import { ProductType } from '@/types/product';
import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ productList }: { productList: ProductType[] }) => {
  return productList && productList.length > 0 ? (
    <div className="grid grid-cols-4 gap-4">
      {productList.slice(0, 10).map((product) => (
        <ProductCard {...product}></ProductCard>
      ))}
    </div>
  ) : (
    <></>
  );
};

export default ProductGrid;

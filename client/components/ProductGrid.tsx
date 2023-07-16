import { ProductType } from '@/types/product';
import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({
  productList,
  className = 'grid-cols-4 gap-4',
}: {
  productList: ProductType[];
  className?: string;
}) => {
  return productList && productList.length > 0 ? (
    <div className={`grid ${className}`}>
      {productList.slice(0, 10).map((product) => (
        <ProductCard {...product} key={product._id}></ProductCard>
      ))}
    </div>
  ) : (
    <></>
  );
};

export default ProductGrid;

import { ProductType } from '@/types/product';
import { filterList } from '@/utils/contains';
import React from 'react';
import FiterDropdown from './FiterDropdown';

const FilterList = ({ productList }: { productList: ProductType[] }) => {
  const filterProductList = filterList.map((filter) => {
    const filterContent = productList.map((product: any) => {
      if (filter.ma === 'brand') {
        return product[filter.ma].name;
      }

      return product[filter.ma];
    });

    let newFilterContent: any = new Set(filterContent);
    newFilterContent = [...newFilterContent];

    return {
      key: filter.ma,
      name: filter.ten,
      filterContent: newFilterContent,
    };
  });

  return filterProductList.map((filterProduct) => (
    <FiterDropdown
      filterProduct={filterProduct}
      key={filterProduct.key}
    ></FiterDropdown>
  ));
};

export default FilterList;

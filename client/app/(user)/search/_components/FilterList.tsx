import { ProductType } from '@/types/product';
import { filterList } from '@/utils/contains';
import React from 'react';
import FilterContent from './FilterContent';

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
    <div className="search-dropdown" key={filterProduct.key}>
      <div className="search-dropdown_header">
        <h5>
          {filterProduct.name.charAt(0).toUpperCase() +
            filterProduct.name.slice(1)}
        </h5>
        <span>
          <i className="bi bi-chevron-compact-down"></i>
        </span>
      </div>
      <div className="search-dropdown_checkbox">
        <FilterContent filterContent={filterProduct.filterContent} />
      </div>
    </div>
  ));
};

export default FilterList;

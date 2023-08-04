'use client';

import React from 'react';
import FilterCheckbox from './FilterCheckbox';

const FilterContent = ({
  filterContent,
  filterKey,
}: {
  filterContent: [any];
  filterKey: string;
}) => {
  return filterContent.map((filter, idx) => (
    <FilterCheckbox
      filter={filter}
      key={filter + idx}
      filterKey={filterKey}
    ></FilterCheckbox>
  ));
};

export default FilterContent;

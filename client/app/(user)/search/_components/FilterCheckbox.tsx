'use client';

import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

const FilterCheckbox = ({ filterName, filterKey }: any) => {
  const searchParams = useSearchParams();

  const [checkBoxName, setCheckBoxName] = useState<string>(
    searchParams.has(filterKey) ? searchParams.get(filterKey) || '' : '',
  );

  return (
    <label htmlFor={filterName} className="search-dropdown_checkbox-item">
      <div className="checkbox-container">
        <input
          type="checkbox"
          className="checkbox-input"
          id={filterKey}
          value={filterName}
          defaultChecked={
            filterName.toLowerCase() === checkBoxName.toLowerCase()
          }
          onChange={() => {
            if (filterName.toLowerCase() === checkBoxName.toLowerCase()) {
              setCheckBoxName('');
            } else {
              setCheckBoxName(filterName);
            }
          }}
        />
        <div className="checkbox-inner">
          <i className="bi bi-check-lg"></i>
        </div>
      </div>
      <span>{filterName}</span>
    </label>
  );
};

export default FilterCheckbox;

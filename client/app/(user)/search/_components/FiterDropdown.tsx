'use client';

import React, { useState } from 'react';
import FilterContent from './FilterContent';

const FiterDropdown = ({ filterProduct }: any) => {
  const [show, setShow] = useState(false);
  return (
    <div
      className="search-dropdown"
      key={filterProduct.key}
      onClick={() => setShow(!show)}
    >
      <div className="search-dropdown_header">
        <h5>
          {filterProduct.name.charAt(0).toUpperCase() +
            filterProduct.name.slice(1)}
        </h5>
        <span>
          <i className={`bi bi-chevron-compact-${show ? 'up' : 'down'}`}></i>
        </span>
      </div>
      <div className={`search-dropdown_checkbox ${show ? '!block' : ''}`}>
        <FilterContent
          filterContent={filterProduct.filterContent}
          filterKey={filterProduct.key}
        />
      </div>
    </div>
  );
};

export default FiterDropdown;

import React from 'react';

const FilterContent = ({ filterContent }: { filterContent: [any] }) => {
  return filterContent.map((filter) => (
    <label
      htmlFor={filter}
      className="search-dropdown_checkbox-item"
      key={filter}
    >
      <div className="checkbox-container">
        <input
          type="checkbox"
          className="checkbox-input"
          id={filter}
          value={filter}
        />
        <div className="checkbox-inner">
          <i className="bi bi-check-lg"></i>
        </div>
      </div>
      <span>{filter}</span>
    </label>
  ));
};

export default FilterContent;

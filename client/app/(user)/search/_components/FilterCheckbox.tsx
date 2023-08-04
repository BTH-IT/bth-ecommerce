'use client';

import { handleRemoveRouter, handleUpdateRouter } from '@/utils/clientActions';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const FilterCheckbox = ({ filterName, filterKey }: any) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [checkBoxName, setCheckBoxName] = useState<string>(
    searchParams.has(filterKey) ? searchParams.get(filterKey) || '' : '',
  );

  useEffect(() => {
    if (!checkBoxName) {
      handleRemoveRouter(filterKey, searchParams, router);
    }
  }, [checkBoxName]);

  return (
    <label htmlFor={filterName} className="search-dropdown_checkbox-item">
      <div className="checkbox-container">
        <input
          type="checkbox"
          className="checkbox-input"
          id={filterName}
          value={filterName}
          defaultChecked={
            checkBoxName
              ? Boolean(
                  checkBoxName
                    .split('%')
                    .find(
                      (value) =>
                        value.toLowerCase() === filterName.toLowerCase(),
                    ),
                )
              : false
          }
          onChange={() => {
            if (
              checkBoxName &&
              Boolean(
                checkBoxName
                  .split('%')
                  .find(
                    (value) => value.toLowerCase() === filterName.toLowerCase(),
                  ),
              )
            ) {
              const valueList = checkBoxName.split('%');

              const newValueList = valueList.filter(
                (value) => value.toLowerCase() !== filterName.toLowerCase(),
              );

              setCheckBoxName(newValueList.join('%'));

              handleUpdateRouter(
                filterKey,
                newValueList.join('%'),
                searchParams,
                router,
              );
            } else {
              if (checkBoxName === '') {
                setCheckBoxName(checkBoxName + filterName);
                handleUpdateRouter(
                  filterKey,
                  checkBoxName + filterName,
                  searchParams,
                  router,
                );
              } else {
                setCheckBoxName(checkBoxName + '%' + filterName);
                handleUpdateRouter(
                  filterKey,
                  checkBoxName + '%' + filterName,
                  searchParams,
                  router,
                );
              }
            }
          }}
        />
        <div className="checkbox-inner">
          <i className="bi bi-check-lg"></i>
        </div>
      </div>
      <span>{filterName.replaceAll('-', ' ')}</span>
    </label>
  );
};

export default FilterCheckbox;

'use client';

import { handleRemoveRouter, handleUpdateRouter } from '@/utils/clientActions';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const SortLabel = ({
  sort,
  setSort,
  value,
  title,
}: {
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  title: string;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <label
      htmlFor={value}
      className={`search-filter_item ${sort === value ? 'active' : ''}`}
      data-value={value}
      onClick={() => {
        if (sort !== value) {
          setSort(value);
          handleUpdateRouter('sort', value, searchParams, router);
        } else {
          setSort('');
          handleRemoveRouter('sort', searchParams, router);
        }
      }}
    >
      <div></div>
      <span>
        <i className="bi bi-check"></i>
      </span>
      {title}
    </label>
  );
};

export default SortLabel;

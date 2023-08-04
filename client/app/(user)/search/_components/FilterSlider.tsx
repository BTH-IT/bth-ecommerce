'use client';

import { ProductType } from '@/types/product';
import {
  SearchParamsType,
  handleSearchParamsToObject,
  handleSearchParamsToStringUrl,
  handleUpdateRouter,
} from '@/utils/clientActions';
import debounce from 'lodash.debounce';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { RangeSlider, InputGroup, InputNumber } from 'rsuite';

const FilterSlider = ({ productList }: { productList: ProductType[] }) => {
  const [value, setValue] = useState([
    0,
    productList.reduce((p, c) => p + c.originPrice, 0),
  ]);

  const [maxValue, setMaxValue] = useState(
    productList.reduce((p, c) => p + c.originPrice, 0),
  );

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (productList.length > 0) {
      setMaxValue(productList.reduce((p, c) => p + c.originPrice, 0));
      setValue([0, productList.reduce((p, c) => p + c.originPrice, 0)]);
    }
  }, [productList]);

  return (
    <div>
      <InputGroup className="mt-3">
        <InputNumber
          min={0}
          max={maxValue}
          value={value[0]}
          onBlur={debounce((nextValue) => {
            const [start, end] = value;
            if (Number(nextValue) > end) {
              return;
            }
            setValue([Number(nextValue), end]);
            handleUpdateRouter(
              'min-price',
              nextValue + '',
              searchParams,
              router,
            );
          }, 500)}
        />
        <InputGroup.Addon>-</InputGroup.Addon>
        <InputNumber
          min={0}
          max={maxValue}
          value={value[1]}
          onBlur={debounce((nextValue) => {
            const [start, end] = value;
            if (start > Number(nextValue)) {
              return;
            }
            setValue([start, Number(nextValue)]);
            handleUpdateRouter(
              'max-price',
              nextValue + '',
              searchParams,
              router,
            );
          }, 500)}
        />
      </InputGroup>
      <RangeSlider
        max={maxValue}
        defaultValue={[0, maxValue]}
        className="my-4"
        onChange={debounce((value) => {
          setValue(value);
          const searchParamsObject: SearchParamsType =
            handleSearchParamsToObject(searchParams);

          searchParamsObject['min-price'] = value[0] + '';
          searchParamsObject['max-price'] = value[1] + '';

          router.replace(
            '/search?' + handleSearchParamsToStringUrl(searchParamsObject),
          );
        }, 1000)}
      />
    </div>
  );
};

export default FilterSlider;

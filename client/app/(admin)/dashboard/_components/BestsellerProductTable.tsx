'use client';

import { usePagination } from '@/hooks/usePagination';
import { ProductType } from '@/types/product';
import Image from 'next/image';
import React from 'react';
import { Pagination, Table } from 'rsuite';
const { Column, HeaderCell, Cell } = Table;

const ImageCell = ({ rowData, dataKey, ...props }: any) => (
  <Cell {...props} style={{ padding: 0 }}>
    <div
      style={{
        width: 40,
        height: 40,
        background: '#f5f5f5',
        borderRadius: 6,
        marginTop: 2,
        overflow: 'hidden',
        display: 'inline-block',
      }}
    >
      <Image
        src={rowData.imageUrlList[0]}
        width={40}
        height={40}
        alt={rowData.productName}
      />
    </div>
  </Cell>
);

const BestsellerProductTable = ({
  productList,
}: {
  productList: ProductType[];
}) => {
  const {
    handleChangeLimit,
    limit,
    page,
    setPage,
    getDataSorted,
    loading,
    handleSortColumn,
    sortColumn,
    sortType,
  } = usePagination(productList);

  return (
    <div className="dashboard-bestseller_table">
      <Table
        height={420}
        data={getDataSorted()}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
        loading={loading}
        autoHeight={true}
      >
        <Column sortable fixed flexGrow={1}>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="_id" />
        </Column>

        <Column sortable flexGrow={1}>
          <HeaderCell>Tên sản phẩm</HeaderCell>
          <Cell dataKey="productName"></Cell>
        </Column>

        <Column sortable width={200}>
          <HeaderCell>Hình ảnh</HeaderCell>
          <ImageCell dataKey="imageList" />
        </Column>

        <Column sortable fixed width={200}>
          <HeaderCell>Số lượng đã bán</HeaderCell>
          <Cell dataKey="soldNum">
            {(rowData) => <span>{rowData.soldNum} sản phẩm</span>}
          </Cell>
        </Column>
      </Table>
      <div style={{ padding: 20 }}>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          size="xs"
          layout={['total', '-', 'limit', '|', 'pager', 'skip']}
          total={productList.length}
          limitOptions={[10, 30, 50]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
        />
      </div>
    </div>
  );
};

export default BestsellerProductTable;

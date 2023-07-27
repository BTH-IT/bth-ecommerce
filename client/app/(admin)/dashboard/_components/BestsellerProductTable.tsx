'use client';

import { usePagination } from '@/hooks/usePagination';
import Image from 'next/image';
import React from 'react';
import { Pagination, Table } from 'rsuite';
import { ProductListType } from './DashboardBestsellerProduct';
const { Column, HeaderCell, Cell } = Table;

const ImageCell = ({ rowData, dataKey, ...props }: any) => {
  return (
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
};

const BestsellerProductTable = ({
  productList,
}: {
  productList: ProductListType[];
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
      <div>
        <Table
          height={420}
          data={getDataSorted()}
          sortColumn={sortColumn}
          sortType={sortType}
          onSortColumn={handleSortColumn}
          loading={loading}
          autoHeight={true}
        >
          <Column fixed width={300} align="center" flexGrow={1}>
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="_id" />
          </Column>

          <Column sortable width={600} align="center">
            <HeaderCell>Tên sản phẩm</HeaderCell>
            <Cell dataKey="productName"></Cell>
          </Column>

          <Column align="center" width={200}>
            <HeaderCell>Hình ảnh</HeaderCell>
            <ImageCell dataKey="imageUrlList" />
          </Column>

          <Column fixed={'right'} width={200} align="center">
            <HeaderCell>Số lượng đã bán</HeaderCell>
            <Cell dataKey="amount">
              {(rowData) => <span>{rowData.amount} sản phẩm</span>}
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
            layout={['total', '-', 'pager', 'skip']}
            maxButtons={5}
            size="xs"
            total={productList.length}
            limit={limit}
            activePage={page}
            onChangePage={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default BestsellerProductTable;

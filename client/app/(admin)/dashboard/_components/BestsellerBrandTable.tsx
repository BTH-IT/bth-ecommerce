'use client';

import { usePagination } from '@/hooks/usePagination';
import { BrandType } from '@/types/brand';
import { ProductType } from '@/types/product';
import Image from 'next/image';
import React from 'react';
import { IconButton, Pagination, Table } from 'rsuite';
import CollaspedOutlineIcon from '@rsuite/icons/CollaspedOutline';
import ExpandOutlineIcon from '@rsuite/icons/ExpandOutline';
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
        src={rowData.avatar}
        width={40}
        height={40}
        alt={rowData.productName}
      />
    </div>
  </Cell>
);

const ExpandCell = ({
  rowData,
  dataKey,
  expandedRowKeys,
  onChange,
  ...props
}: any) => (
  <Cell {...props} style={{ padding: 5 }}>
    <IconButton
      appearance="subtle"
      onClick={() => {
        onChange(rowData);
      }}
      icon={
        expandedRowKeys.some((key: any) => key === rowData['_id']) ? (
          <CollaspedOutlineIcon />
        ) : (
          <ExpandOutlineIcon />
        )
      }
    />
  </Cell>
);

const renderRowExpanded = (rowData: any) => {
  return (
    <div>
      <div
        style={{
          width: 60,
          height: 60,
          float: 'left',
          marginRight: 10,
          background: '#eee',
        }}
      >
        <img src={rowData.avatar} style={{ width: 60 }} />
      </div>
      <p>Email: {rowData.email}</p>
      <p>Phone: {rowData.phone}</p>
    </div>
  );
};

const BestsellerBrandTable = ({
  brandList,
  productList,
}: {
  brandList: BrandType[];
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

  const [expandedRowKeys, setExpandedRowKeys] = React.useState([]);

  const handleExpanded = (rowData: any, dataKey: any) => {
    let open = false;
    const nextExpandedRowKeys: any = [];

    expandedRowKeys.forEach((key) => {
      if (key === rowData['_id']) {
        open = true;
      } else {
        nextExpandedRowKeys.push(key);
      }
    });

    if (!open) {
      nextExpandedRowKeys.push(rowData['_id']);
    }

    setExpandedRowKeys(nextExpandedRowKeys);
  };

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
        rowKey={'_id'}
        expandedRowKeys={expandedRowKeys}
      >
        <Column width={70} align="center">
          <HeaderCell>#</HeaderCell>
          <ExpandCell
            dataKey="_id"
            expandedRowKeys={expandedRowKeys}
            onChange={handleExpanded}
          />
        </Column>

        <Column sortable fixed flexGrow={1}>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="_id" />
        </Column>

        <Column sortable flexGrow={1}>
          <HeaderCell>Tên thương hiệu</HeaderCell>
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

export default BestsellerBrandTable;

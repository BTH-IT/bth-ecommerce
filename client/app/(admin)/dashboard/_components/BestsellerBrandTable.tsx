'use client';

import { usePagination } from '@/hooks/usePagination';
import { BrandType } from '@/types/brand';
import { ProductType } from '@/types/product';
import Image from 'next/image';
import React from 'react';
import { IconButton, Pagination, Table } from 'rsuite';
import CollaspedOutlineIcon from '@rsuite/icons/CollaspedOutline';
import ExpandOutlineIcon from '@rsuite/icons/ExpandOutline';
import { BrandListType } from './DashboardBestsellerBrand';
import RowExpandTable from './RowExpandTable';
const { Column, HeaderCell, Cell } = Table;

const ImageCell = ({ rowData, dataKey, ...props }: any) => (
  <Cell {...props} style={{ padding: 0 }}>
    <div
      style={{
        background: '#f5f5f5',
        borderRadius: 6,
        marginTop: 2,
        overflow: 'hidden',
        display: 'inline-block',
      }}
    >
      <Image src={rowData.thumbUrl} width={44} height={44} alt={rowData.name} />
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
  <Cell
    {...props}
    style={{
      padding: 5,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
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
    <RowExpandTable
      productBrandList={rowData.productBrandList}
    ></RowExpandTable>
  );
};

const BestsellerBrandTable = ({
  brandList,
}: {
  brandList: BrandListType[];
}) => {
  const {
    limit,
    page,
    setPage,
    getDataSorted,
    loading,
    handleSortColumn,
    sortColumn,
    sortType,
  } = usePagination(brandList);

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
      <div>
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
          renderRowExpanded={renderRowExpanded}
        >
          <Column width={70} align="center" fixed>
            <HeaderCell>#</HeaderCell>
            <ExpandCell
              dataKey="_id"
              expandedRowKeys={expandedRowKeys}
              onChange={handleExpanded}
            />
          </Column>

          <Column fixed flexGrow={1} align="center">
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="_id" />
          </Column>

          <Column sortable width={200} align="center">
            <HeaderCell>Tên thương hiệu</HeaderCell>
            <Cell dataKey="name"></Cell>
          </Column>

          <Column width={200} align="center">
            <HeaderCell>Hình ảnh</HeaderCell>
            <ImageCell dataKey="thumbUrl" />
          </Column>

          <Column fixed width={200} align="center">
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
            maxButtons={5}
            size="xs"
            layout={['total', '-', 'pager', 'skip']}
            total={brandList.length}
            limit={limit}
            activePage={page}
            onChangePage={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default BestsellerBrandTable;

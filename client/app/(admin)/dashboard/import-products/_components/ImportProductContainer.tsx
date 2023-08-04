'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { Modal, Table, Pagination, Checkbox } from 'rsuite';
import { handleRefreshToken } from '@/utils/clientActions';
import toast from 'react-hot-toast';
import { usePagination } from '@/hooks/usePagination';
import { DatePicker, Input, Space } from 'antd';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { ProductType } from '@/types/product';
import productService from '@/services/productService';
import { useCheckBoxTable } from '@/hooks/useCheckBoxTable';
import ImportProductForm from './ImportProductForm';

const { Search } = Input;

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
      <Image
        src={rowData.imageUrlList[0]}
        width={44}
        height={44}
        alt={rowData.name}
      />
    </div>
  </Cell>
);

const CheckCell = ({
  rowData,
  onChange,
  checkedKeys,
  dataKey,
  ...props
}: any) => (
  <Cell {...props} style={{ padding: 0 }}>
    <div style={{ lineHeight: '46px' }}>
      <Checkbox
        value={rowData}
        inline
        onChange={onChange}
        checked={checkedKeys.some((item: any) => item._id === rowData._id)}
      />
    </div>
  </Cell>
);

const ImportProductContainer = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [productList, setProductList] = useState<ProductType[]>([]);
  const [search, setSearch] = useState<string>('');
  const { handleCheckAll, handleCheck, checkedKeys, checked, indeterminate } =
    useCheckBoxTable(productList);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const {
    page,
    setPage,
    getDataSorted,
    loading,
    handleSortColumn,
    sortColumn,
    sortType,
  } = usePagination(productList);

  useEffect(() => {
    async function fetchProductList() {
      try {
        const success = await handleRefreshToken(dispatch);

        if (success) {
          const res = await productService.getAll({
            search,
          });

          setProductList(res);
        } else {
          router.replace('/login');
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    }

    fetchProductList();
  }, [search]);

  const handleSearching = async (value: string) => {
    setSearch(value);
  };

  const handleImportProduct = () => {
    setOpen(true);
  };

  return (
    <div className="import-products-table">
      <div className="import-products-table_header">
        <div className="import-products-table_filter">
          <Space direction="vertical" size={12}>
            <Search placeholder="search" onSearch={handleSearching} />
          </Space>
          <div
            className="import-products-table_add-btn"
            onClick={handleImportProduct}
          >
            <PlusCircleIcon className="w-6 h-6"></PlusCircleIcon>
            <span className="font-semibold">Import Products</span>
          </div>
        </div>
        <div>
          <Table
            data={getDataSorted()}
            sortColumn={sortColumn}
            sortType={sortType}
            onSortColumn={handleSortColumn}
            loading={loading}
            autoHeight={true}
            bordered
          >
            <Column width={300} align="center">
              <HeaderCell>Id</HeaderCell>
              <Cell dataKey="_id" />
            </Column>

            <Column sortable width={400} align="center">
              <HeaderCell>Product Name</HeaderCell>
              <Cell dataKey="productName"></Cell>
            </Column>

            <Column width={300} align="center">
              <HeaderCell>Thumbnail Primary</HeaderCell>
              <ImageCell dataKey="imageUrlList"></ImageCell>
            </Column>

            <Column sortable width={300} align="center">
              <HeaderCell>Remain</HeaderCell>
              <Cell dataKey="remain"></Cell>
            </Column>

            <Column width={250} align="center" flexGrow={1} fixed="right">
              <HeaderCell style={{ padding: 0 }}>
                <div style={{ lineHeight: '40px' }}>
                  <Checkbox
                    inline
                    checked={checked}
                    indeterminate={indeterminate}
                    onChange={handleCheckAll}
                  />
                </div>
              </HeaderCell>
              <CheckCell checkedKeys={checkedKeys} onChange={handleCheck} />
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
              total={productList.length}
              limit={50}
              activePage={page}
              onChangePage={setPage}
            />
          </div>
        </div>
      </div>
      <Modal overflow={true} open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Nhập sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ImportProductForm
            checkedKeys={checkedKeys}
            handleClose={handleClose}
          ></ImportProductForm>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ImportProductContainer;

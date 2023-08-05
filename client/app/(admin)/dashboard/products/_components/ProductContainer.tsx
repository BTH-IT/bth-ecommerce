'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { Modal, Button, Table, Pagination } from 'rsuite';
import { handleRefreshToken } from '@/utils/clientActions';
import toast from 'react-hot-toast';
import { usePagination } from '@/hooks/usePagination';
import { Input, Space } from 'antd';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import ProductActionCell from './ProductActionCell';
import ProductForm from './ProductForm';
import { ProductType } from '@/types/product';
import productService from '@/services/productService';
import { convertCurrency, numberWithCommas } from '@/utils/contains';

const { Search } = Input;

const { Column, HeaderCell, Cell } = Table;

const ImageThumbCell = ({ rowData, dataKey, ...props }: any) => (
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
        alt={rowData.productName}
      />
    </div>
  </Cell>
);

const ProductContainer = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [add, setAdd] = useState(false);
  const [product, setProduct] = useState<ProductType | null>(null);
  const [productList, setProductList] = useState<ProductType[]>([]);
  const [search, setSearch] = useState<string>('');

  const dispatch = useAppDispatch();
  const [modalData, setModalData] = useState({
    title: 'Sửa sản phẩm',
    key: 'update-product',
  });

  const handleOpen = async (product: ProductType) => {
    setProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setAdd(false);
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
        const res = await productService.getAll({
          search,
        });

        setProductList(res);
      } catch (error: any) {
        toast.error(error.message);
      }
    }

    fetchProductList();
  }, [search]);

  const handleSearching = async (value: string) => {
    if (!value) return;

    setSearch(value);
  };

  const handleAdding = () => {
    setModalData({
      title: 'Thêm sản phẩm',
      key: 'add-product',
    });
    setProduct(null);
    setAdd(true);
    setOpen(true);
  };

  return (
    <div className="products-table">
      <div className="products-table_header">
        <div className="products-table_filter">
          <Space direction="vertical" size={12}>
            <Search placeholder="search" onSearch={handleSearching} />
          </Space>
          <div className="products-table_add-btn" onClick={handleAdding}>
            <PlusCircleIcon className="w-6 h-6"></PlusCircleIcon>
            <span className="font-semibold">Add New Product</span>
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

            <Column sortable width={300} align="center">
              <HeaderCell>Product Name</HeaderCell>
              <Cell dataKey="productName"></Cell>
            </Column>

            <Column width={150} align="center">
              <HeaderCell>Image Primary</HeaderCell>
              <ImageThumbCell dataKey="imageUrlList"></ImageThumbCell>
            </Column>

            <Column width={250} align="center">
              <HeaderCell>Origin Price</HeaderCell>
              <Cell dataKey="originPrice">
                {(rowData) => (
                  <span>{convertCurrency(rowData.originPrice)}</span>
                )}
              </Cell>
            </Column>

            <Column sortable width={150} align="center">
              <HeaderCell>Sale Percent</HeaderCell>
              <Cell dataKey="salePercent">
                {(rowData) => <span>{rowData.salePercent}%</span>}
              </Cell>
            </Column>

            <Column sortable width={125} align="center">
              <HeaderCell>Remain</HeaderCell>
              <Cell dataKey="remain">
                {(rowData) => <span>{numberWithCommas(rowData.remain)}</span>}
              </Cell>
            </Column>

            <Column width={300} align="center">
              <HeaderCell>Hành động</HeaderCell>
              <ProductActionCell
                dataKey="_id"
                handleOpen={handleOpen}
                handleModal={setModalData}
              />
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
          <Modal.Title>{modalData.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalData.key === 'delete-product' && product && (
            <p className="text-center">Bạn thật sự muốn xóa đơn hàng chứ?</p>
          )}
          {(modalData.key === 'add-product' ||
            modalData.key === 'update-product') && (
            <ProductForm
              add={add}
              handleClose={handleClose}
              product={product}
            ></ProductForm>
          )}
        </Modal.Body>
        {modalData.key === 'delete-product' && product && (
          <Modal.Footer>
            <Button onClick={handleClose} appearance="subtle">
              Cancel
            </Button>
            <Button onClick={handleClose} appearance="primary">
              Ok
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
};

export default ProductContainer;

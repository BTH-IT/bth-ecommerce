'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Modal, Button, Table, Pagination } from 'rsuite';
import { handleRefreshToken } from '@/utils/clientActions';
import toast from 'react-hot-toast';
import { usePagination } from '@/hooks/usePagination';
import { DatePicker, Input, Space } from 'antd';
import BrandActionCell from './BrandActionCell';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import brandService from '@/services/brandService';
import { BrandType } from '@/types/brand';
import BrandForm from './BrandForm';
import PermissionHOC from '@/components/PermissionHOC';

const { Search } = Input;

const { Column, HeaderCell, Cell } = Table;
export type RangeValue = Parameters<
  NonNullable<React.ComponentProps<typeof DatePicker.RangePicker>['onChange']>
>[0];

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
      <Image src={rowData.thumbUrl} width={44} height={44} alt={rowData.name} />
    </div>
  </Cell>
);

const ImageIconCell = ({ rowData, dataKey, ...props }: any) => (
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
      <Image src={rowData.iconUrl} width={44} height={44} alt={rowData.name} />
    </div>
  </Cell>
);

const BrandContainer = () => {
  return PermissionHOC(() => {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [add, setAdd] = useState(false);
    const [brand, setBrand] = useState<BrandType | null>(null);
    const [brandList, setBrandList] = useState<BrandType[]>([]);
    const [search, setSearch] = useState<string>('');

    const dispatch = useAppDispatch();
    const [modalData, setModalData] = useState({
      title: 'Sửa thương hiệu',
      key: 'update-brand',
    });

    const handleOpen = async (brand: BrandType) => {
      setBrand(brand);
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
    } = usePagination(brandList);

    useEffect(() => {
      async function fetchBrandList() {
        try {
          const success = await handleRefreshToken(dispatch);

          if (success) {
            const res = await brandService.getAll({
              search,
            });

            setBrandList(res);
          } else {
            router.replace('/login');
          }
        } catch (error: any) {
          toast.error(error.message);
        }
      }

      fetchBrandList();
    }, [search]);

    const handleSearching = async (value: string) => {
      setSearch(value);
    };

    const handleAdding = () => {
      setModalData({
        title: 'Thêm thương hiệu',
        key: 'add-brand',
      });
      setBrand(null);
      setAdd(true);
      setOpen(true);
    };

    const handleRemoveBrand = async () => {
      try {
        const success = await handleRefreshToken(dispatch);

        if (success) {
          if (brand) {
            await brandService.remove(brand._id);
            toast.success('Delete successfully');
            router.refresh();
          }
        } else {
          router.replace('/');
        }
      } catch (error: any) {
        console.log(error.message);
      } finally {
        handleClose();
        toast.success('Delete failure');
      }
    };

    return (
      <div className="brands-table">
        <div className="brands-table_header">
          <div className="brands-table_filter">
            <Space direction="vertical" size={12}>
              <Search placeholder="search" onSearch={handleSearching} />
            </Space>
            <div className="brands-table_add-btn" onClick={handleAdding}>
              <PlusCircleIcon className="w-6 h-6"></PlusCircleIcon>
              <span className="font-semibold">Add New Brand</span>
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
                <HeaderCell>Name</HeaderCell>
                <Cell dataKey="name"></Cell>
              </Column>

              <Column width={300} align="center">
                <HeaderCell>Thumbnail</HeaderCell>
                <ImageThumbCell dataKey="thumbUrl"></ImageThumbCell>
              </Column>

              <Column width={300} align="center">
                <HeaderCell>Icon</HeaderCell>
                <ImageIconCell dataKey="iconUrl"></ImageIconCell>
              </Column>

              <Column width={300} align="center">
                <HeaderCell>Hành động</HeaderCell>
                <BrandActionCell
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
                total={brandList.length}
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
            {modalData.key === 'delete-brand' && brand && (
              <p className="text-center">Bạn thật sự muốn xóa đơn hàng chứ?</p>
            )}
            {(modalData.key === 'add-brand' ||
              modalData.key === 'update-brand') && (
              <BrandForm
                add={add}
                handleClose={handleClose}
                brand={brand}
              ></BrandForm>
            )}
          </Modal.Body>
          {modalData.key === 'delete-brand' && brand && (
            <Modal.Footer>
              <Button onClick={handleClose} appearance="subtle">
                Cancel
              </Button>
              <Button onClick={handleRemoveBrand} appearance="primary">
                Ok
              </Button>
            </Modal.Footer>
          )}
        </Modal>
      </div>
    );
  });
};

export default BrandContainer;

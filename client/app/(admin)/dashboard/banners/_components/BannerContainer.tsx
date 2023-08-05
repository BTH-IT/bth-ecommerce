'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { Modal, Button, Table, Pagination } from 'rsuite';
import { handleRefreshToken } from '@/utils/clientActions';
import toast from 'react-hot-toast';
import { usePagination } from '@/hooks/usePagination';
import { DatePicker, Input, Space } from 'antd';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { BannerType } from '@/types/banner';
import BannerForm from './BannerForm';
import BannerActionCell from './BannerActionCell';
import bannerService from '@/services/bannerService';
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

const BannerContainer = () => {
  return PermissionHOC(() => {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [add, setAdd] = useState(false);
    const [banner, setBanner] = useState<BannerType | null>(null);
    const [bannerList, setBannerList] = useState<BannerType[]>([]);
    const [search, setSearch] = useState<string>('');

    const dispatch = useAppDispatch();
    const [modalData, setModalData] = useState({
      title: 'Sửa banner',
      key: 'update-banner',
    });

    const handleOpen = async (banner: BannerType) => {
      setBanner(banner);
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
    } = usePagination(bannerList);

    useEffect(() => {
      async function fetchbannerList() {
        try {
          const success = await handleRefreshToken(dispatch);

          if (success) {
            const res = await bannerService.getAll({
              search,
            });

            setBannerList(res);
          } else {
            router.replace('/login');
          }
        } catch (error: any) {
          toast.error(error.message);
        }
      }

      fetchbannerList();
    }, [search]);

    const handleSearching = async (value: string) => {
      setSearch(value);
    };

    const handleAdding = () => {
      setModalData({
        title: 'Thêm banner',
        key: 'add-banner',
      });
      setBanner(null);
      setAdd(true);
      setOpen(true);
    };

    return (
      <div className="banners-table">
        <div className="banners-table_header">
          <div className="banners-table_filter">
            <Space direction="vertical" size={12}>
              <Search placeholder="search" onSearch={handleSearching} />
            </Space>
            <div className="banners-table_add-btn" onClick={handleAdding}>
              <PlusCircleIcon className="w-6 h-6"></PlusCircleIcon>
              <span className="font-semibold">Add New banner</span>
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
              <Column fixed width={300} align="center">
                <HeaderCell>Id</HeaderCell>
                <Cell dataKey="_id" />
              </Column>

              <Column sortable width={300} align="center">
                <HeaderCell>Name</HeaderCell>
                <Cell dataKey="name"></Cell>
              </Column>

              <Column sortable width={200} align="center">
                <HeaderCell>Thumbnail</HeaderCell>
                <ImageThumbCell dataKey="thumbUrl"></ImageThumbCell>
              </Column>

              <Column width={200} align="center">
                <HeaderCell>Active</HeaderCell>
                <Cell dataKey="isShow">
                  {(rowData) => <span>{rowData.isShow ? 'Yes' : 'No'}</span>}
                </Cell>
              </Column>

              <Column fixed="right" width={300} align="center">
                <HeaderCell>Hành động</HeaderCell>
                <BannerActionCell
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
                total={bannerList.length}
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
            {modalData.key === 'delete-banner' && banner && (
              <p className="text-center">Bạn thật sự muốn xóa đơn hàng chứ?</p>
            )}
            {(modalData.key === 'add-banner' ||
              modalData.key === 'update-banner') && (
              <BannerForm
                add={add}
                handleClose={handleClose}
                banner={banner}
              ></BannerForm>
            )}
          </Modal.Body>
          {modalData.key === 'delete-banner' && banner && (
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
  });
};

export default BannerContainer;

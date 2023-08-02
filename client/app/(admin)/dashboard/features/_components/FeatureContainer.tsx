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
import ProductActionCell from './FeatureActionCell';
import { FeatureType } from '@/types/feature';
import featureService from '@/services/featureService';
import FeatureForm from './FeatureForm';
import moment from 'moment';

const { Search } = Input;

const { Column, HeaderCell, Cell } = Table;

const FeatureContainer = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [add, setAdd] = useState(false);
  const [feature, setFeature] = useState<FeatureType | null>(null);
  const [featureList, setFeatureList] = useState<FeatureType[]>([]);
  const [search, setSearch] = useState<string>('');

  const dispatch = useAppDispatch();
  const [modalData, setModalData] = useState({
    title: 'Sửa sản phẩm',
    key: 'update-feature',
  });

  const handleOpen = async (feature: FeatureType) => {
    setFeature(feature);
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
  } = usePagination(featureList);

  useEffect(() => {
    async function fetchBrandList() {
      try {
        const success = await handleRefreshToken(dispatch);

        if (success) {
          const res = await featureService.getAll({
            search,
          });

          setFeatureList(res);
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
      title: 'Thêm chức năng',
      key: 'add-feature',
    });
    setFeature(null);
    setAdd(true);
    setOpen(true);
  };

  return (
    <div className="features-table">
      <div className="features-table_header">
        <div className="features-table_filter">
          <Space direction="vertical" size={12}>
            <Search placeholder="search" onSearch={handleSearching} />
          </Space>
          <div className="features-table_add-btn" onClick={handleAdding}>
            <PlusCircleIcon className="w-6 h-6"></PlusCircleIcon>
            <span className="font-semibold">Add New Feature</span>
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
            <Column width={400} align="center">
              <HeaderCell>Id</HeaderCell>
              <Cell dataKey="_id" />
            </Column>

            <Column sortable width={400} align="center">
              <HeaderCell>Name</HeaderCell>
              <Cell dataKey="name"></Cell>
            </Column>

            <Column width={400} align="center">
              <HeaderCell>Created At</HeaderCell>
              <Cell dataKey="createdAt">
                {(rowData) => (
                  <span>{moment(rowData.createdAt).format('L')}</span>
                )}
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
              total={featureList.length}
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
          {modalData.key === 'delete-feature' && feature && (
            <p className="text-center">Bạn thật sự muốn xóa đơn hàng chứ?</p>
          )}
          {(modalData.key === 'add-feature' ||
            modalData.key === 'update-feature') && (
            <FeatureForm
              add={add}
              handleClose={handleClose}
              feature={feature}
            ></FeatureForm>
          )}
        </Modal.Body>
        {modalData.key === 'delete-feature' && feature && (
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

export default FeatureContainer;

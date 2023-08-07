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
import ProductActionCell from './RoleActionCell';
import { RoleType } from '@/types/role';
import roleService from '@/services/roleService';
import RoleForm from './RoleForm';
import PermissionHOC from '@/components/PermissionHOC';

const { Search } = Input;

const { Column, HeaderCell, Cell } = Table;

const RoleContainer = () => {
  return PermissionHOC(() => {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [add, setAdd] = useState(false);
    const [role, setRole] = useState<RoleType | null>(null);
    const [roleList, setRoleList] = useState<RoleType[]>([]);
    const [search, setSearch] = useState<string>('');

    const dispatch = useAppDispatch();
    const [modalData, setModalData] = useState({
      title: 'Sửa vai trò',
      key: 'update-role',
    });

    const handleOpen = async (role: RoleType) => {
      setRole(role);
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
    } = usePagination(roleList);

    useEffect(() => {
      async function fetchRoleList() {
        try {
          const success = await handleRefreshToken(dispatch);

          if (success) {
            const res = await roleService.getAll({
              search,
            });

            setRoleList(res);
          } else {
            router.replace('/login');
          }
        } catch (error: any) {
          toast.error(error.message);
        }
      }

      fetchRoleList();
    }, [search]);

    const handleSearching = async (value: string) => {
      setSearch(value);
    };

    const handleAdding = () => {
      setModalData({
        title: 'Thêm vai trò',
        key: 'add-role',
      });
      setRole(null);
      setAdd(true);
      setOpen(true);
    };

    const handleRemoveRole = async () => {
      try {
        const success = await handleRefreshToken(dispatch);

        if (success) {
          if (role) {
            await roleService.remove(role._id);
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
      <div className="roles-table">
        <div className="roles-table_header">
          <div className="roles-table_filter">
            <Space direction="vertical" size={12}>
              <Search placeholder="search" onSearch={handleSearching} />
            </Space>
            <div className="roles-table_add-btn" onClick={handleAdding}>
              <PlusCircleIcon className="w-6 h-6"></PlusCircleIcon>
              <span className="font-semibold">Add New Role</span>
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

              <Column width={425} align="center">
                <HeaderCell>Description</HeaderCell>
                <Cell dataKey="description"></Cell>
              </Column>

              <Column fixed="right" width={350} align="center">
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
                total={roleList.length}
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
            {modalData.key === 'delete-role' && role && (
              <p className="text-center">Bạn thật sự muốn xóa đơn hàng chứ?</p>
            )}
            {(modalData.key === 'add-role' ||
              modalData.key === 'update-role') && (
              <RoleForm
                add={add}
                handleClose={handleClose}
                role={role}
              ></RoleForm>
            )}
          </Modal.Body>
          {modalData.key === 'delete-role' && role && (
            <Modal.Footer>
              <Button onClick={handleClose} appearance="subtle">
                Cancel
              </Button>
              <Button onClick={handleRemoveRole} appearance="primary">
                Ok
              </Button>
            </Modal.Footer>
          )}
        </Modal>
      </div>
    );
  });
};

export default RoleContainer;

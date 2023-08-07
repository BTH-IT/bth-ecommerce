'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { Modal, Table, Pagination } from 'rsuite';
import { handleRefreshToken } from '@/utils/clientActions';
import toast from 'react-hot-toast';
import { usePagination } from '@/hooks/usePagination';
import { Input, Space } from 'antd';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import roleService from '@/services/roleService';
import { RoleType } from '@/types/role';
import AuthorizationForm from './AuthorizationForm';
import PermissionHOC from '@/components/PermissionHOC';

const { Search } = Input;

const { Column, HeaderCell, Cell } = Table;

const AuthorizationContainer = () => {
  return PermissionHOC(() => {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [role, setRole] = useState<RoleType | null>(null);
    const [update, setUpdate] = useState<boolean>(false);
    const [roleList, setRoleList] = useState<RoleType[]>([]);
    const [search, setSearch] = useState<string>('');

    const dispatch = useAppDispatch();

    const handleOpen = async (role: RoleType) => {
      setRole(role);
      setOpen(true);
    };

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
    }, [search, update]);

    const handleSearching = async (value: string) => {
      setSearch(value);
    };

    return (
      <div className="roles-table">
        <div className="roles-table_header">
          <div className="roles-table_filter">
            <Space direction="vertical" size={12}>
              <Search placeholder="search" onSearch={handleSearching} />
            </Space>
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
                <HeaderCell>Description</HeaderCell>
                <Cell dataKey="description"></Cell>
              </Column>

              <Column width={300} align="center">
                <HeaderCell>Thay đổi quyền hạng</HeaderCell>
                <Cell dataKey="">
                  {(rowData) => (
                    <ArrowTopRightOnSquareIcon
                      className="w-6 h-6 text-gray-500 cursor-pointer"
                      onClick={() => {
                        handleOpen(rowData as RoleType);
                      }}
                    ></ArrowTopRightOnSquareIcon>
                  )}
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
                total={roleList.length}
                limit={50}
                activePage={page}
                onChangePage={setPage}
              />
            </div>
          </div>
        </div>
        <Modal
          overflow={true}
          open={open}
          onClose={handleClose}
          className="max-w-[1000px] w-full"
        >
          <Modal.Header>
            <Modal.Title>Thay đổi quyền hạng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AuthorizationForm
              role={role}
              handleClose={handleClose}
              handleUpdate={setUpdate}
            ></AuthorizationForm>
          </Modal.Body>
        </Modal>
      </div>
    );
  });
};

export default AuthorizationContainer;

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
import accountService from '@/services/accountService';
import AccountActionCell from './AccountActionCell';
import { AccountType } from '@/types/account';
import CreateAccountForm from './CreateAccountForm';
import UpdateAccountForm from './UpdateAccountForm';
import CreateAccountWithAvailableUserForm from './CreateAccountWithAvailableUserForm';
import PermissionHOC from '@/components/PermissionHOC';
import roleService from '@/services/roleService';
import { RoleType } from '@/types/role';
import userService from '@/services/userService';
import { UserType } from '@/types/auth';

const { Search } = Input;

const { Column, HeaderCell, Cell } = Table;
export type RangeValue = Parameters<
  NonNullable<React.ComponentProps<typeof DatePicker.RangePicker>['onChange']>
>[0];

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
      <Image src={rowData.picture} width={44} height={44} alt={rowData.email} />
    </div>
  </Cell>
);

const AccountContainer = () => {
  return PermissionHOC(() => {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [account, setAccount] = useState<AccountType | null>(null);
    const [accountList, setAccountList] = useState<AccountType[]>([]);
    const [roleList, setRoleList] = useState<RoleType[]>([]);
    const [userWithoutAccountList, setUserWithoutAccountList] = useState<
      UserType[]
    >([]);
    const [search, setSearch] = useState<string>('');

    const dispatch = useAppDispatch();
    const [modalData, setModalData] = useState({
      title: 'Sửa tài khoản',
      key: 'update-account',
    });

    const handleOpen = async (account: AccountType) => {
      setAccount(account);
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
    } = usePagination(accountList);

    useEffect(() => {
      async function fetchDataList() {
        try {
          const success = await handleRefreshToken(dispatch);

          if (success) {
            const res = await roleService.getAll();
            const resUserWithoutAccount =
              await userService.getAllWithoutAccount({ notAccount: true });

            setRoleList(res);
            setUserWithoutAccountList(resUserWithoutAccount);
          } else {
            router.replace('/');
          }
        } catch (error: any) {
          console.log(error.message);
        }
      }

      fetchDataList();
    }, []);

    useEffect(() => {
      async function fetchAccountList() {
        try {
          const success = await handleRefreshToken(dispatch);

          if (success) {
            const res = await accountService.getAll({
              search,
            });

            setAccountList(res);
          } else {
            router.replace('/login');
          }
        } catch (error: any) {
          toast.error(error.message);
        }
      }

      fetchAccountList();
    }, [search]);

    const handleSearching = async (value: string) => {
      setSearch(value);
    };

    const handleAdding = () => {
      setModalData({
        title: 'Thêm tài khoản',
        key: 'add-account',
      });
      setAccount(null);
      setOpen(true);
    };

    const handleAddingWithAvailableUser = () => {
      setModalData({
        title: 'Thêm tài khoản với người dùng có sẳn',
        key: 'add-account-with-available-user',
      });
      setAccount(null);
      setOpen(true);
    };

    const handleRemoveAccount = async () => {
      try {
        const success = await handleRefreshToken(dispatch);

        if (success) {
          if (account) {
            await accountService.remove(account._id);
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
      <div className="accounts-table">
        <div className="accounts-table_header">
          <div className="p-4">
            <div className="flex justify-between gap-5">
              <div className="accounts-table_add-btn" onClick={handleAdding}>
                <PlusCircleIcon className="w-6 h-6"></PlusCircleIcon>
                <span className="font-semibold">
                  Add New Account With New User
                </span>
              </div>
              <div
                className="accounts-table_add-btn"
                onClick={handleAddingWithAvailableUser}
              >
                <PlusCircleIcon className="w-6 h-6"></PlusCircleIcon>
                <span className="font-semibold">
                  Add New Account With Available User
                </span>
              </div>
            </div>
            <Space direction="vertical" size={12} className="w-full my-5">
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
                <HeaderCell>Email</HeaderCell>
                <Cell dataKey="email"></Cell>
              </Column>

              <Column width={150} align="center">
                <HeaderCell>Picture</HeaderCell>
                <ImageCell dataKey="picture"></ImageCell>
              </Column>

              <Column sortable width={300} align="center">
                <HeaderCell>Role</HeaderCell>
                <Cell dataKey="role">
                  {(rowData) => <span>{rowData.role.name}</span>}
                </Cell>
              </Column>

              <Column width={300} align="center">
                <HeaderCell>Hành động</HeaderCell>
                <AccountActionCell
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
                total={accountList.length}
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
            {modalData.key === 'delete-account' && account && (
              <p className="text-center">Bạn thật sự muốn xóa đơn hàng chứ?</p>
            )}
            {modalData.key === 'add-account' && (
              <CreateAccountForm handleClose={handleClose}></CreateAccountForm>
            )}
            {modalData.key === 'add-account-with-available-user' && (
              <CreateAccountWithAvailableUserForm
                roleList={roleList}
                userList={userWithoutAccountList}
                handleClose={handleClose}
              ></CreateAccountWithAvailableUserForm>
            )}
            {modalData.key === 'update-account' && account && (
              <UpdateAccountForm
                roleList={roleList}
                handleClose={handleClose}
                account={account}
              ></UpdateAccountForm>
            )}
          </Modal.Body>
          {modalData.key === 'delete-account' && account && (
            <Modal.Footer>
              <Button onClick={handleClose} appearance="subtle">
                Cancel
              </Button>
              <Button onClick={handleRemoveAccount} appearance="primary">
                Ok
              </Button>
            </Modal.Footer>
          )}
        </Modal>
      </div>
    );
  });
};

export default AccountContainer;

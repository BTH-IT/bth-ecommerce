'use client';

import { Table, Popover, Whisper, Dropdown, IconButton } from 'rsuite';
import MoreIcon from '@rsuite/icons/legacy/More';

const { Cell } = Table;

const AccountActionCell = ({
  rowData,
  handleOpen,
  handleModal,
  ...props
}: any) => {
  const renderMenu = ({ onClose, left, top, className }: any, ref: any) => {
    const handleSelect = async (eventKey: any) => {
      onClose();
      handleOpen(rowData);
      handleModal(eventKey);
    };

    return (
      <Popover ref={ref} className={className} style={{ left, top }} full>
        <Dropdown.Menu onSelect={handleSelect}>
          <Dropdown.Item
            eventKey={{
              title: 'Sửa tài khoản',
              key: 'update-account',
            }}
          >
            Sửa tài khoản
          </Dropdown.Item>
          <Dropdown.Item
            eventKey={{
              title: 'Xóa tài khoản',
              key: 'delete-account',
            }}
          >
            Xóa tài khoản
          </Dropdown.Item>
        </Dropdown.Menu>
      </Popover>
    );
  };

  return (
    <Cell {...props} className="link-group">
      <Whisper
        placement="autoVerticalStart"
        trigger="click"
        speaker={renderMenu}
      >
        <IconButton appearance="subtle" icon={<MoreIcon />} />
      </Whisper>
    </Cell>
  );
};

export default AccountActionCell;

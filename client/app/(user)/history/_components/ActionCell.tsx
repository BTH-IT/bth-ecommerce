'use client';

import { Table, Popover, Whisper, Dropdown, IconButton } from 'rsuite';
import MoreIcon from '@rsuite/icons/legacy/More';
import toast from 'react-hot-toast';

const { Cell } = Table;

const ActionCell = ({ rowData, handleOpen, handleModal, ...props }: any) => {
  const renderMenu = ({ onClose, left, top, className }: any, ref: any) => {
    const handleSelect = async (eventKey: any) => {
      onClose();
      if (rowData.status !== 'waiting' && eventKey.key !== 'see-more') {
        toast(
          'Orders that have been processed and are in progress cannot be edited',
        );
        return;
      }
      handleOpen(rowData);
      handleModal(eventKey);
    };

    return (
      <Popover ref={ref} className={className} style={{ left, top }} full>
        <Dropdown.Menu onSelect={handleSelect}>
          <Dropdown.Item
            eventKey={{
              title: 'Xem chi tiết',
              key: 'see-more',
            }}
          >
            Xem chi tiết
          </Dropdown.Item>
          {rowData.status === 'waiting' && (
            <>
              <Dropdown.Item
                eventKey={{
                  title: 'Sửa đơn hàng',
                  key: 'update-order',
                }}
              >
                Sửa đơn hàng
              </Dropdown.Item>
              <Dropdown.Item
                eventKey={{
                  title: 'Hủy đơn hàng',
                  key: 'cancel-order',
                }}
              >
                Hủy đơn hàng
              </Dropdown.Item>
            </>
          )}
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

export default ActionCell;

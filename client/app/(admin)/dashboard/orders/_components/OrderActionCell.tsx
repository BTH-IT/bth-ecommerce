'use client';

import { Table, Popover, Whisper, Dropdown, IconButton } from 'rsuite';
import MoreIcon from '@rsuite/icons/legacy/More';

const { Cell } = Table;

const OrderActionCell = ({
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
              title: 'Xem chi tiết',
              key: 'see-more',
            }}
          >
            Xem chi tiết
          </Dropdown.Item>
          {rowData.status !== 'done' && (
            <Dropdown.Item
              eventKey={{
                title: 'Sửa trạng thái đơn hàng',
                key: 'update-order',
              }}
            >
              Sửa trạng thái
            </Dropdown.Item>
          )}
          <Dropdown.Item
            eventKey={{
              title: 'Xóa đơn hàng',
              key: 'delete-order',
            }}
          >
            Xóa đơn hàng
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

export default OrderActionCell;

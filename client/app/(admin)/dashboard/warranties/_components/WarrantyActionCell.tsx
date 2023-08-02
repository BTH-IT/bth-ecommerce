'use client';

import { Table, Popover, Whisper, Dropdown, IconButton } from 'rsuite';
import MoreIcon from '@rsuite/icons/legacy/More';

const { Cell } = Table;

const WarrantyActionCell = ({
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
              title: 'Sửa bảo hành',
              key: 'update-warranty',
            }}
          >
            Sửa bảo hành
          </Dropdown.Item>
          <Dropdown.Item
            eventKey={{
              title: 'Xóa bảo hành',
              key: 'delete-warranty',
            }}
          >
            Xóa bảo hành
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

export default WarrantyActionCell;

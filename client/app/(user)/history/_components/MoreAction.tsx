'use client';

import { useClickOutSide } from '@/hooks/useClickOutSide';
import React, { useState } from 'react';
import { Modal } from 'rsuite';

const MoreAction = ({
  orderId,
  handleOpen,
  handleModal,
}: {
  orderId: string;
  handleOpen: (orderId: string) => void;
  handleModal: React.Dispatch<
    React.SetStateAction<{
      title: string;
      key: string;
    }>
  >;
}) => {
  const { setShow, elementRef, show } = useClickOutSide();

  const handleSeeMore = () => {
    handleOpen(orderId);
    handleModal({
      title: 'Xem chi tiết',
      key: 'see-more',
    });
    setShow(false);
  };

  const handleUpdateOrder = () => {
    handleOpen(orderId);
    handleModal({
      title: 'Sửa đơn hàng',
      key: 'update-order',
    });
    setShow(false);
  };

  const handleCancelOrder = () => {
    handleOpen(orderId);
    handleModal({
      title: 'Hủy đơn hàng',
      key: 'cancel-order',
    });
    setShow(false);
  };

  return (
    <span className="info-item">
      <span className="inline-block max-w-[36px]" ref={elementRef}>
        <svg
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          width={36}
          height={36}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          onClick={() => {
            console.log(show);
            setShow((prev) => !prev);
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
          />
        </svg>
        {show && (
          <ul className="infor-dropdown">
            <li
              className="text-green-500 infor-dropdown_item"
              onClick={handleSeeMore}
            >
              Xem chi tiết
            </li>
            <li
              className="infor-dropdown_item text-primary"
              onClick={handleUpdateOrder}
            >
              Sửa đơn
            </li>
            <li
              className="text-red-500 infor-dropdown_item"
              onClick={handleCancelOrder}
            >
              Hủy đơn
            </li>
          </ul>
        )}
      </span>
    </span>
  );
};

export default MoreAction;

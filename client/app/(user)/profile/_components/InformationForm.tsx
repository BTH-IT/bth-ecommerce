'use client';

import { selectAuth } from '@/redux/features/authSlice';
import { useAppSelector } from '@/redux/hooks';
import authService from '@/services/authService';
import React, { useEffect, useState } from 'react';

const InformationForm = () => {
  const accessToken = useAppSelector(selectAuth).accessToken;
  const [data, setData] = useState<any>({});

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await authService.getProfile(accessToken);

        setData(res.data);
      } catch (error: any) {
        throw new Error(error.message);
      }
    }

    fetchProfile();
  }, []);

  console.log(data);

  return (
    <form className="form">
      <div className="avatar_container">
        <div className="mt-2 d-flex justify-content-center align-items-center">
          <div className="avatar">
            <input id="avatar" type="file" accept="image/*" hidden />
            <label htmlFor="avatar">
              <img
                src="https://server.bthung313.site/images/avatar.jpg"
                alt=""
              />
            </label>
            <i className="fa-solid fa-trash"></i>
          </div>
        </div>
      </div>
      <div className="input_container">
        <label htmlFor="fullname" className="label">
          Họ tên
        </label>
        <div className="input">
          <input id="fullname" type="text" placeholder="Họ tên..." />
        </div>
        <span className="mb-1 text-danger error"></span>
      </div>
      <div className="input_container">
        <label htmlFor="birth-date" className="label">
          Ngày sinh
        </label>
        <div className="input">
          <input id="birth-date" type="date" placeholder="Ngày sinh..." />
        </div>
        <span className="mb-1 text-danger error"></span>
      </div>
      <div className="input_container">
        <label htmlFor="phone" className="label">
          Số điện thoại
        </label>
        <div className="input">
          <input id="phone" type="text" placeholder="Số điện thoại..." />
        </div>
        <span className="mb-1 text-danger error"></span>
      </div>
      <div className="input_container">
        <label htmlFor="address" className="label">
          Địa chỉ
        </label>
        <div className="input">
          <input id="address" type="text" placeholder="Địa chỉ..." />
        </div>
        <span className="mb-1 text-danger error"></span>
      </div>
      <div className="select_container">
        <label htmlFor="gender" className="label">
          Giới tính
        </label>
        <div className="select">
          <select name="" id="gender">
            <option value="" hidden selected>
              Chọn giới tính
            </option>
            <option value="1">Nam</option>
            <option value="0">Nữ</option>
          </select>
        </div>
        <span className="mb-1 text-danger error"></span>
      </div>
      <button type="submit" className="btn primary btn-update">
        Cập nhật
      </button>
    </form>
  );
};

export default InformationForm;

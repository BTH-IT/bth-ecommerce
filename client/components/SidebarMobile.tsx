"use client";
import React from "react";
import "../css/layouts/sidebar.css";

const SidebarMobile = () => {
  return (
    <div className="sidebar">
      <a className="sidebar-item auth" href="/login">
        <span className="action-icon">
          <i className="fa-regular fa-circle-user"></i>
        </span>
        <span className="action-title">
          Đăng nhập
          <br />
          Đăng kí
        </span>
      </a>
      <a className="sidebar-item logged" href="./profile.html">
        <span className="action-icon">
          <i className="fa-regular fa-circle-user"></i>
        </span>
        <span className="action-title">Thông tin tài khoản</span>
      </a>
      <a className="sidebar-item logged" href="./change-password.html">
        <span className="action-icon">
          <i className="fa-solid fa-unlock"></i>
        </span>
        <span className="action-title">Cập nhật mật khẩu mới</span>
      </a>
      <a className="sidebar-item logged" href="./history.html">
        <span className="action-icon">
          <i className="fa-sharp fa-solid fa-clipboard-check"></i>
        </span>
        <span className="action-title">Quản lý đơn hàng</span>
      </a>

      <a className="sidebar-item" href="./cart.html">
        <span className="action-icon">
          <i className="fa-solid fa-cart-shopping"></i>
        </span>
        <span className="action-title cart"></span>
      </a>

      <a className="sidebar-item logout" href="./login.html">
        <span className="action-icon">
          <i className="fa-solid fa-right-from-bracket"></i>
        </span>
        <span className="action-title"> Đăng xuất </span>
      </a>
    </div>
  );
};

export default SidebarMobile;

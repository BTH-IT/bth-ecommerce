import { ProductType } from '@/types/product';
import React from 'react';

const InforProduct = ({ product }: { product: ProductType }) => {
  return (
    <>
      <h4>Thông tin chi tiết</h4>
      <table>
        <tbody>
          <tr>
            <td>Thương hiệu</td>
            <td>{product.brand.name}</td>
          </tr>
          <tr>
            <td>Bảo hành</td>
            <td>{product.warranteeYear}</td>
          </tr>
          <tr>
            <td>Series laptop</td>
            <td>{product.seriesLaptop}</td>
          </tr>
          <tr>
            <td>Màu sắc</td>
            <td>{product.color}</td>
          </tr>
          <tr>
            <td>Thế hệ CPU</td>
            <td>{product.generateCpu}</td>
          </tr>
          <tr>
            <td>CPU</td>
            <td>{product.cpu}</td>
          </tr>
          <tr>
            <td>Chip đồ họa</td>
            <td>{product.chip}</td>
          </tr>
          <tr>
            <td>Tên RAM</td>
            <td>{product.ramName}</td>
          </tr>
          <tr>
            <td>Dung lượng RAM</td>
            <td>{product.ramSize} GB</td>
          </tr>
          <tr>
            <td>Màn hình</td>
            <td>{product.screen}</td>
          </tr>
          <tr>
            <td>Tên thiết bị lưu trữ</td>
            <td>{product.storageName}</td>
          </tr>
          <tr>
            <td>Dung lượng lưu trữ</td>
            <td>{product.storageSize} GB</td>
          </tr>
          <tr>
            <td>Số cổng lưu trữ tối đa</td>
            <td>{product.storagePortMaximum}</td>
          </tr>
          <tr>
            <td>Kiểu khe M.2 hỗ trợ</td>
            <td>{product.supportM2slotType}</td>
          </tr>
          <tr>
            <td>Tên cổng xuất hình</td>
            <td>{product.screenOutputPortName}</td>
          </tr>
          <tr>
            <td>Số cổng xuất hình</td>
            <td>{product.screenOutputPortNum}</td>
          </tr>

          <tr>
            <td>Kết nối không dây</td>
            <td>{product.bluetooth}</td>
          </tr>
          <tr>
            <td>Bàn phím</td>
            <td>{product.keyboard}</td>
          </tr>
          <tr>
            <td>Hệ điều hành</td>
            <td>{product.operationSystem}</td>
          </tr>
          <tr>
            <td>Kích thước</td>
            <td>{product.size} cm</td>
          </tr>
          <tr>
            <td>Pin</td>
            <td>{product.pin}</td>
          </tr>
          <tr>
            <td>Khối lượng</td>
            <td>{product.weight} kg</td>
          </tr>
          <tr>
            <td>Đèn LED trên máy</td>
            <td>{product.led ? 'Có' : 'Không'}</td>
          </tr>
          <tr>
            <td>Màn hình cảm ứng</td>
            <td>{product.touchScreen ? 'Có' : 'Không'}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default InforProduct;

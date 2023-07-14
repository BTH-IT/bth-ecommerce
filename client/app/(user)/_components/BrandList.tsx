import { BrandType } from "@/types/brand";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BrandList = ({ brandList }: { brandList: BrandType[] }) => {
  if (!brandList || brandList.length <= 0) return <></>;

  return brandList.map((brand) => (
    <li className="brand_item" key={brand._id}>
      <Link href={`/search?thuong_hieu=${brand.name}`} className="brand_link">
        <div className="brand_img">
          <Image
            src={
              "https://plus.unsplash.com/premium_photo-1689177357836-52c9d90d3d6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
            }
            alt={brand.name}
            width={24}
            height={24}
          />
        </div>
        <span>{brand.name}</span>
      </Link>
    </li>
  ));
};

export default BrandList;

import { BrandType } from '@/types/brand';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const BrandList = ({ brandList }: { brandList: BrandType[] }) => {
  if (!brandList || brandList.length <= 0) return <></>;

  return brandList.map((brand) => (
    <li className="brand_item" key={brand._id}>
      <Link href={`/search?thuong_hieu=${brand.name}`} className="brand_link">
        <div className="brand_img">
          <Image src={brand.iconUrl} alt={brand.name} width={24} height={24} />
        </div>
        <span>{brand.name}</span>
      </Link>
    </li>
  ));
};

export default BrandList;

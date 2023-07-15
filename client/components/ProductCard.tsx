import { ProductType } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import '../css/components/product-card.css';
import { convertCurrency } from '@/utils/contains';

const ProductCard = (props: ProductType) => {
  if (props.salePercent && props.salePercent > 0) {
    const newPrice =
      props.originPrice - (props.salePercent * props.originPrice) / 100;

    return (
      <Link className="product-card" href={`/product-detail/${props._id}`}>
        <span className="product-card_sale">
          {props.salePercent}%<br></br>OFF
        </span>
        <div className="product-card_image">
          <Image
            src={props.imageUrlList[0]}
            alt={props.productName}
            width={10000}
            height={10000}
          />
        </div>
        <div className="product-card_info">
          <h6 className="product-card_title">{props.productName}</h6>
          <p className="product-card_sale-price">{convertCurrency(newPrice)}</p>
          <s className="product-card_price">
            {convertCurrency(props.originPrice)}
          </s>
          <p className="product-card_save-price">
            Save -{convertCurrency(props.originPrice - newPrice)}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link className="product-card" href={`/product-detail/${props._id}`}>
      <div className="product-card_image">
        <Image
          src={props.imageUrlList[0]}
          alt={props.productName}
          width={10000}
          height={10000}
        />
      </div>
      <div className="product-card_info">
        <h6 className="product-card_title">{props.productName}</h6>
        <p className="product-card_sale-price">
          {convertCurrency(props.originPrice)}
        </p>
        <s className="product-card_price">&nbsp;</s>
        <p className="product-card_save-price">&nbsp;</p>
      </div>
    </Link>
  );
};

export default ProductCard;

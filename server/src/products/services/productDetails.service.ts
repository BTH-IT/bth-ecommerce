import {
  CreateNewProductDto,
  DeleteProductDto,
  ProductParamsDto,
  UpdateProductDto,
} from '../../dto/product.dto';
import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../repositories/products.repo';
import { Product } from '@/schemas/product.schema';
import { ProductDetailsRepository } from '../repositories/product-details.repo';
import { ObjectId } from '@/utils/contains';
import {
  CreateNewProductDetailDto,
  DeleteProductDetailDto,
} from '@/dto/product-detail';
import { ProductDetail } from '@/schemas/product-detail.schema';

@Injectable()
export class ProductDetailsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly productDetailsRepository: ProductDetailsRepository,
  ) {}

  async createNewProductDetail(
    data: CreateNewProductDetailDto,
  ): Promise<Product> {
    const newProduct = await this.productDetailsRepository.create({
      product: new ObjectId(data.product),
    });
    return newProduct;
  }

  async deleteProductDetail(
    product: DeleteProductDetailDto,
  ): Promise<ProductDetail | null> {
    const productDetail = await this.productDetailsRepository.findByCondition({
      product: new ObjectId(product._id),
    });

    if (!productDetail) return productDetail;

    await this.productDetailsRepository.deleteOne(
      productDetail?._id.toString(),
    );

    return productDetail;
  }
}

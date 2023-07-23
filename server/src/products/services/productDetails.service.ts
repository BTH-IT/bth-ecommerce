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

  // async findAll(params: ProductParamsDto): Promise<Product[]> {
  //   const aggregateList: any = [
  //     {
  //       $lookup: {
  //         from: 'productdetails',
  //         localField: '_id',
  //         foreignField: 'product',
  //         as: 'remainList',
  //       },
  //     },
  //     {
  //       $project: {
  //         _id: 1,
  //         productName: 1,
  //         imageUrlList: 1,
  //         warranteeYear: 1,
  //         originPrice: 1,
  //         salePercent: 1,
  //         description: 1,
  //         brand: 1,
  //         generateCpu: 1,
  //         cpu: 1,
  //         seriesCpu: 1,
  //         chip: 1,
  //         ramName: 1,
  //         ramSize: 1,
  //         screen: 1,
  //         storageName: 1,
  //         storageSize: 1,
  //         storagePortName: 1,
  //         storagePortNum: 1,
  //         storagePortMaximum: 1,
  //         supportM2slotType: 1,
  //         screenOutputPortName: 1,
  //         screenOutputPortNum: 1,
  //         bluetooth: 1,
  //         keyboard: 1,
  //         operationSystem: 1,
  //         size: 1,
  //         pin: 1,
  //         weight: 1,
  //         seriesLaptop: 1,
  //         partNumber: 1,
  //         color: 1,
  //         accessoriesIncluded: 1,
  //         led: 1,
  //         touchScreen: 1,
  //         remain: {
  //           $size: '$remainList',
  //         },
  //       },
  //     },
  //   ];

  //   if (params.sort === 'hot') {
  //     return await this.productsRepository.aggregate([
  //       ...aggregateList,
  //       { $sort: { remain: -1 } },
  //     ]);
  //   } else if (params.sale) {
  //     return await this.productsRepository.aggregate([
  //       ...aggregateList,
  //       {
  //         $match: {
  //           salePercent: {
  //             $gt: 0,
  //           },
  //         },
  //       },
  //       {
  //         $sort: {
  //           salePercent: -1,
  //         },
  //       },
  //     ]);
  //   } else if (params.search && params.search.key) {
  //     const re = new RegExp(params.search.key, 'g');
  //     return await this.productsRepository.aggregate([
  //       ...aggregateList,
  //       {
  //         $match: {
  //           productName: {
  //             $regex: re,
  //           },
  //         },
  //       },
  //     ]);
  //   }

  //   return await this.productsRepository.aggregate(aggregateList);
  // }

  // async findOne(id: string): Promise<Product> {
  //   const productList = await this.productsRepository.aggregate([
  //     {
  //       $match: { _id: new ObjectId(id) },
  //     },
  //     {
  //       $lookup: {
  //         from: 'productdetails',
  //         localField: '_id',
  //         foreignField: 'product',
  //         as: 'remainList',
  //       },
  //     },
  //     {
  //       $project: {
  //         _id: 1,
  //         productName: 1,
  //         imageUrlList: 1,
  //         warranteeYear: 1,
  //         originPrice: 1,
  //         salePercent: 1,
  //         description: 1,
  //         brand: 1,
  //         generateCpu: 1,
  //         cpu: 1,
  //         seriesCpu: 1,
  //         chip: 1,
  //         ramName: 1,
  //         ramSize: 1,
  //         screen: 1,
  //         storageName: 1,
  //         storageSize: 1,
  //         storagePortName: 1,
  //         storagePortNum: 1,
  //         storagePortMaximum: 1,
  //         supportM2slotType: 1,
  //         screenOutputPortName: 1,
  //         screenOutputPortNum: 1,
  //         bluetooth: 1,
  //         keyboard: 1,
  //         operationSystem: 1,
  //         size: 1,
  //         pin: 1,
  //         weight: 1,
  //         seriesLaptop: 1,
  //         partNumber: 1,
  //         color: 1,
  //         accessoriesIncluded: 1,
  //         led: 1,
  //         touchScreen: 1,
  //         remain: { $size: '$remainList' },
  //       },
  //     },
  //   ]);

  //   return productList[0];
  // }

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

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

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly productDetailsRepository: ProductDetailsRepository,
  ) {}

  async findAll(params: ProductParamsDto): Promise<Product[]> {
    // eslint-disable-next-line prefer-const
    let aggregateList: any[] = [
      {
        $lookup: {
          from: 'productdetails',
          localField: '_id',
          foreignField: 'product',
          as: 'remainList',
        },
      },
      {
        $project: {
          _id: 1,
          productName: 1,
          imageUrlList: 1,
          warranteeYear: 1,
          originPrice: 1,
          salePercent: 1,
          description: 1,
          brand: 1,
          generateCpu: 1,
          cpu: 1,
          seriesCpu: 1,
          chip: 1,
          ramName: 1,
          ramSize: 1,
          screen: 1,
          storageName: 1,
          storageSize: 1,
          storagePortName: 1,
          storagePortNum: 1,
          storagePortMaximum: 1,
          supportM2slotType: 1,
          screenOutputPortName: 1,
          screenOutputPortNum: 1,
          bluetooth: 1,
          keyboard: 1,
          operationSystem: 1,
          size: 1,
          pin: 1,
          weight: 1,
          seriesLaptop: 1,
          partNumber: 1,
          color: 1,
          accessoriesIncluded: 1,
          led: 1,
          touchScreen: 1,
          remain: {
            $size: '$remainList',
          },
        },
      },
    ];

    const match: any = {};

    if (params.sort) {
      switch (params.sort) {
        case 'hot':
          aggregateList = [...aggregateList, { $sort: { remain: -1 } }];
          break;
        case 'bestseller':
          aggregateList = [...aggregateList, { $sort: { soldNum: -1 } }];
          break;
        case 'sale':
          aggregateList = [...aggregateList, { $sort: { salePercent: -1 } }];
          break;
        case 'newal':
          aggregateList = [...aggregateList, { $sort: { createdAt: -1 } }];
          break;
        case 'desc-price':
          aggregateList = [...aggregateList, { $sort: { originPrice: -1 } }];
          break;
        case 'asc-price':
          aggregateList = [...aggregateList, { $sort: { originPrice: 1 } }];
          break;
      }
    } else if (params.sale) {
      return await this.productsRepository.aggregate([
        ...aggregateList,
        {
          $match: {
            salePercent: {
              $gt: 0,
            },
          },
        },
        {
          $sort: {
            salePercent: -1,
          },
        },
      ]);
    }

    if (params.search) {
      const re = new RegExp(params.search, 'g');
      match['productName'] = {
        $regex: re,
      };
    }

    if (params.chip) {
      const re = new RegExp(params.chip, 'g');
      match['chip'] = {
        $regex: re,
      };
    }

    if (params.color) {
      const re = new RegExp(params.color, 'g');
      match['color'] = {
        $regex: re,
      };
    }

    if (params.ramSize) {
      match['ramSize'] = {
        $eq: Number(params.ramSize),
      };
    }

    if (params.seriesCpu) {
      const re = new RegExp(params.seriesCpu, 'g');
      match['seriesCpu'] = {
        $regex: re,
      };
    }

    if (params.size) {
      const re = new RegExp(params.size, 'g');
      match['size'] = {
        $regex: re,
      };
    }

    aggregateList = [
      ...aggregateList,
      {
        $match: match,
      },
    ];

    const list = await this.productsRepository.aggregate(aggregateList);

    return list.slice((Number(params.page) - 1) * 10, Number(params.page) * 10);
  }

  async findOne(id: string): Promise<Product> {
    const productList = await this.productsRepository.aggregate([
      {
        $match: { _id: new ObjectId(id) },
      },
      {
        $lookup: {
          from: 'productdetails',
          localField: '_id',
          foreignField: 'product',
          as: 'remainList',
        },
      },
      {
        $project: {
          _id: 1,
          productName: 1,
          imageUrlList: 1,
          warranteeYear: 1,
          originPrice: 1,
          salePercent: 1,
          description: 1,
          brand: 1,
          generateCpu: 1,
          cpu: 1,
          seriesCpu: 1,
          chip: 1,
          ramName: 1,
          ramSize: 1,
          screen: 1,
          storageName: 1,
          storageSize: 1,
          storagePortName: 1,
          storagePortNum: 1,
          storagePortMaximum: 1,
          supportM2slotType: 1,
          screenOutputPortName: 1,
          screenOutputPortNum: 1,
          bluetooth: 1,
          keyboard: 1,
          operationSystem: 1,
          size: 1,
          pin: 1,
          weight: 1,
          seriesLaptop: 1,
          partNumber: 1,
          color: 1,
          accessoriesIncluded: 1,
          led: 1,
          touchScreen: 1,
          remain: { $size: '$remainList' },
        },
      },
    ]);

    return productList[0];
  }

  async createNewProduct(product: CreateNewProductDto): Promise<Product> {
    const newProduct = await this.productsRepository.create(product);
    return newProduct;
  }

  async updateProduct(product: UpdateProductDto): Promise<Product | null> {
    const { _id, ...prd } = product;
    const newProduct = await this.productsRepository.findByIdAndUpdate(
      _id,
      prd,
    );
    return newProduct;
  }

  async deleteProduct(product: DeleteProductDto): Promise<Product | null> {
    const newProduct = await this.productsRepository.findByIdAndUpdate(
      product._id,
      {
        isHidden: false,
      },
    );

    await this.productDetailsRepository.deleteByCondition({
      _id: new ObjectId(product._id),
    });

    return newProduct;
  }
}

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
import { BrandsRepository } from '@/brands/repositories/brands.repo';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly productDetailsRepository: ProductDetailsRepository,
    private readonly brandsRepository: BrandsRepository,
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
      match['chip'] = {
        $in: params.chip.split('%'),
      };
    }

    if (params.color) {
      match['color'] = {
        $in: params.color.split('%'),
      };
    }

    if (params.ramSize) {
      const ramSizeList = params.ramSize.split('%').map((ram) => Number(ram));
      match['ramSize'] = {
        $in: ramSizeList,
      };
    }

    if (params.seriesCpu) {
      match['seriesCpu'] = {
        $in: params.seriesCpu.split('%'),
      };
    }

    if (params.size) {
      match['size'] = {
        $in: params.size.split('%'),
      };
    }

    aggregateList = [
      ...aggregateList,
      {
        $match: match,
      },
    ];

    // eslint-disable-next-line prefer-const
    let list = await this.productsRepository.aggregate(aggregateList);
    const brandList = await this.brandsRepository.findAll();

    if (params.brand) {
      const brandParamsList = params.brand.split('%');

      list = list.filter((product) => {
        const brand = brandList.find(
          (brand) => brand._id.toString() === product.brand.toString(),
        );

        if (!brand) return false;

        return Boolean(
          brandParamsList.find(
            (brandParams) =>
              brandParams.toLowerCase() === brand?.name.toLowerCase(),
          ),
        );
      });
    }

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

import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ImportOrdersService } from '../services/import-orders.service';
import { ImportOrder } from '@/schemas/import-order.schema';
import {
  CreateNewImportOrderInput,
  DeleteImportOrderInput,
  UpdateImportOrderInput,
} from '@/input-types/import-order.input';
import { User } from '@/schemas/user.schema';
import { Supplier } from '@/schemas/supplier.schema';
import { ImportOrderDetail } from '@/schemas/import-order-detail.schema';
import { ImportOrderDetailsService } from '../services/import-order-details.service';
import { SuppliersService } from '@/suppliers/suppliers.service';
import { UsersService } from '@/users/users.service';
import { UseGuards } from '@nestjs/common';
import { ReadImportOrderGuard } from '../guards/read-import-order.guard';
import { CreateImportOrderGuard } from '../guards/create-import-order.guard';
import { UpdateImportOrderGuard } from '../guards/update-import-order.guard';
import { DeleteImportOrderGuard } from '../guards/delete-import-order.guard';
import { ProductDetailsService } from '@/products/services/productDetails.service';
import { ProductsService } from '@/products/services/products.service';
import { ObjectId } from '@/utils/contains';

@Resolver(() => ImportOrder)
export class ImportOrdersResolver {
  constructor(
    private readonly importOrdersService: ImportOrdersService,
    private readonly importOrderDetailsService: ImportOrderDetailsService,
    private readonly productDetailsService: ProductDetailsService,
    private readonly productsService: ProductsService,
    private readonly suppliersService: SuppliersService,
    private readonly usersService: UsersService,
  ) {}

  @Query(() => [ImportOrder])
  @UseGuards(ReadImportOrderGuard)
  getAllImportOrders() {
    return this.importOrdersService.findAll();
  }

  @Query(() => ImportOrder)
  @UseGuards(ReadImportOrderGuard)
  getImportOrder(@Args('id') id: string) {
    return this.importOrdersService.findOne(id);
  }

  @Mutation(() => ImportOrder)
  @UseGuards(CreateImportOrderGuard)
  async createNewImportOrder(
    @Args('createNewImportOrder') data: CreateNewImportOrderInput,
  ) {
    const { importProducts, ...importOrder } = data;

    const newImportProducts = importProducts.map(
      (importProduct) => importProduct.product,
    );
    const totalPay = importProducts.reduce((p, c) => p + c.amount * c.price, 0);

    const newOrder = {
      ...importOrder,
      importProducts: newImportProducts,
      totalPay,
    };

    const orderDoc = await this.importOrdersService.createNewImportOrder(
      newOrder,
    );

    importProducts.forEach(async (p) => {
      for (let i = 1; i <= p.amount; i++) {
        await this.productDetailsService.createNewProductDetail({
          product: p.product,
        });
      }

      const data = {
        price: p.price,
        product: p.product,
        amount: p.amount,
      };

      await this.importOrderDetailsService.createNewImportOrderDetail({
        ...data,
        importOrder: orderDoc._id.toString(),
      });

      await this.productsService.updateProduct({
        _id: p.product,
        originPrice: p.price,
      });
    });

    return orderDoc;
  }

  @Mutation(() => ImportOrder)
  @UseGuards(UpdateImportOrderGuard)
  async updateImportOrder(
    @Args('updateImportOrder') data: UpdateImportOrderInput,
  ) {
    return this.importOrdersService.updateImportOrder(data);
  }

  @Mutation(() => ImportOrder)
  @UseGuards(DeleteImportOrderGuard)
  async deleteImportOrder(
    @Args('deleteImportOrder') data: DeleteImportOrderInput,
  ) {
    return this.importOrdersService.deleteImportOrder(data);
  }

  @ResolveField('importProducts', () => [ImportOrderDetail])
  async getimportProducts(@Parent() importOrder: ImportOrder) {
    return await this.importOrderDetailsService.findManyByCondition(
      importOrder.importProducts,
    );
  }

  @ResolveField('supplier', () => Supplier)
  async getSupplier(@Parent() importOrder: ImportOrder) {
    return await this.suppliersService.findOne(
      importOrder.supplier._id.toString(),
    );
  }

  @ResolveField('employee', () => User)
  async getRoleAndFeature(@Parent() importOrder: ImportOrder) {
    return await this.usersService.findOne(importOrder.employee._id.toString());
  }
}

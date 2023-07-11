import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ImportOrdersService } from './import-orders.service';
import { ImportOrder } from '@/schemas/import-order.schema';
import {
  CreateNewImportOrderInput,
  DeleteImportOrderInput,
  UpdateImportOrderInput,
} from '@/input-types/import-order.input';
import { User } from '@/schemas/user.schema';
import { Supplier } from '@/schemas/supplier.schema';
import { ImportOrderDetail } from '@/schemas/import-order-detail.schema';
import { ImportOrderDetailsService } from './import-order-details.service';
import { SuppliersService } from '@/suppliers/suppliers.service';
import { UsersService } from '@/users/users.service';

@Resolver(() => ImportOrder)
export class ImportOrdersResolver {
  constructor(
    private readonly importOrdersService: ImportOrdersService,
    private readonly importOrderDetailsService: ImportOrderDetailsService,
    private readonly suppliersService: SuppliersService,
    private readonly usersService: UsersService,
  ) {}

  @Query(() => [ImportOrder])
  getAllImportOrders() {
    return this.importOrdersService.findAll();
  }

  @Query(() => ImportOrder)
  getImportOrder(@Args('id') id: string) {
    return this.importOrdersService.findOne(id);
  }

  @Mutation(() => ImportOrder)
  async createNewImportOrder(
    @Args('createNewImportOrder') data: CreateNewImportOrderInput,
  ) {
    return this.importOrdersService.createNewImportOrder(data);
  }

  @Mutation(() => ImportOrder)
  async updateImportOrder(
    @Args('updateImportOrder') data: UpdateImportOrderInput,
  ) {
    return this.importOrdersService.updateImportOrder(data);
  }

  @Mutation(() => ImportOrder)
  async deleteImportOrder(
    @Args('deleteImportOrder') data: DeleteImportOrderInput,
  ) {
    return this.importOrdersService.deleteImportOrder(data);
  }

  @ResolveField('importedProducts', () => [ImportOrderDetail])
  async getImportedProducts(@Parent() importOrder: ImportOrder) {
    return await this.importOrderDetailsService.findManyByCondition(
      importOrder.importedProducts,
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

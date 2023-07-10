import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Supplier } from '@/schemas/supplier.schema';
import { SuppliersService } from './suppliers.service';
import {
  CreateNewSupplierInput,
  DeleteSupplierInput,
  UpdateSupplierInput,
} from '@/input-types/supplier.input';

@Resolver()
export class SuppliersResolver {
  constructor(private suppliersService: SuppliersService) {}

  @Query(() => [Supplier])
  async getAllSuppliers() {
    return await this.suppliersService.findAll();
  }

  @Query(() => Supplier)
  async getSupplier(@Args('id') id: string) {
    return await this.suppliersService.findOne(id);
  }

  @Mutation(() => Supplier)
  async createNewSupplier(
    @Args('createNewSupplier') data: CreateNewSupplierInput,
  ) {
    return this.suppliersService.createNewSupplier(data);
  }

  @Mutation(() => Supplier)
  async updateSupplier(@Args('updateSupplier') data: UpdateSupplierInput) {
    return this.suppliersService.updateSupplier(data);
  }

  @Mutation(() => Supplier)
  async deleteSupplier(@Args('deleteSupplier') data: DeleteSupplierInput) {
    return this.suppliersService.deleteSupplier(data);
  }
}

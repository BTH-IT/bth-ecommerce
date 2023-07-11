import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Supplier } from '@/schemas/supplier.schema';
import { SuppliersService } from './suppliers.service';
import {
  CreateNewSupplierInput,
  DeleteSupplierInput,
  UpdateSupplierInput,
} from '@/input-types/supplier.input';
import { UseGuards } from '@nestjs/common';
import { ReadSupplierGuard } from './guards/read-supplier.guard';
import { CreateSupplierGuard } from './guards/create-supplier.guard';
import { UpdateSupplierGuard } from './guards/update-supplier.guard';
import { DeleteSupplierGuard } from './guards/delete-supplier.guard';

@Resolver()
export class SuppliersResolver {
  constructor(private suppliersService: SuppliersService) {}

  @Query(() => [Supplier])
  @UseGuards(ReadSupplierGuard)
  async getAllSuppliers() {
    return await this.suppliersService.findAll();
  }

  @Query(() => Supplier)
  @UseGuards(ReadSupplierGuard)
  async getSupplier(@Args('id') id: string) {
    return await this.suppliersService.findOne(id);
  }

  @Mutation(() => Supplier)
  @UseGuards(CreateSupplierGuard)
  async createNewSupplier(
    @Args('createNewSupplier') data: CreateNewSupplierInput,
  ) {
    return this.suppliersService.createNewSupplier(data);
  }

  @Mutation(() => Supplier)
  @UseGuards(UpdateSupplierGuard)
  async updateSupplier(@Args('updateSupplier') data: UpdateSupplierInput) {
    return this.suppliersService.updateSupplier(data);
  }

  @Mutation(() => Supplier)
  @UseGuards(DeleteSupplierGuard)
  async deleteSupplier(@Args('deleteSupplier') data: DeleteSupplierInput) {
    return this.suppliersService.deleteSupplier(data);
  }
}

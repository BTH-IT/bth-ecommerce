import { TypesService } from './types.service';
import {
  CreateNewTypeInput,
  DeleteTypeInput,
  UpdateTypeInput,
} from '@/input-types/type.input';
import { Type } from '@/schemas/type.schema';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTypeGuard } from 'guards/create-type.guard';
import { DeleteTypeGuard } from 'guards/delete-type.guard';
import { ReadTypeGuard } from 'guards/read-type.guard';
import { UpdateTypeGuard } from 'guards/update-type.guard';

@Resolver()
export class TypesResolver {
  constructor(private typesService: TypesService) {}

  @Query(() => [Type])
  @UseGuards(ReadTypeGuard)
  async getAllTypes() {
    return await this.typesService.findAll();
  }

  @Query(() => Type)
  @UseGuards(ReadTypeGuard)
  async getType(@Args('id') id: string) {
    return await this.typesService.findOne(id);
  }

  @Mutation(() => Type)
  @UseGuards(CreateTypeGuard)
  async createNewType(@Args('createNewType') data: CreateNewTypeInput) {
    return this.typesService.createNewType(data);
  }

  @Mutation(() => Type)
  @UseGuards(UpdateTypeGuard)
  async updateType(@Args('updateType') data: UpdateTypeInput) {
    return this.typesService.updateType(data);
  }

  @Mutation(() => Type)
  @UseGuards(DeleteTypeGuard)
  async deleteType(@Args('deleteType') data: DeleteTypeInput) {
    return this.typesService.deleteType(data);
  }
}

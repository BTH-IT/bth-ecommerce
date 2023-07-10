import { TypesService } from './types.service';
import {
  CreateNewTypeInput,
  DeleteTypeInput,
  UpdateTypeInput,
} from '@/input-types/type.input';
import { Type } from '@/schemas/type.schema';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class TypesResolver {
  constructor(private typesService: TypesService) {}

  @Query(() => [Type])
  async getAllTypes() {
    return await this.typesService.findAll();
  }

  @Query(() => Type)
  async getType(@Args('id') id: string) {
    return await this.typesService.findOne(id);
  }

  @Mutation(() => Type)
  async createNewType(@Args('createNewType') data: CreateNewTypeInput) {
    return this.typesService.createNewType(data);
  }

  @Mutation(() => Type)
  async updateType(@Args('updateType') data: UpdateTypeInput) {
    return this.typesService.updateType(data);
  }

  @Mutation(() => Type)
  async deleteType(@Args('deleteType') data: DeleteTypeInput) {
    return this.typesService.deleteType(data);
  }
}

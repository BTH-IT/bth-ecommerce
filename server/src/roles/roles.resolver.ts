import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { RoleModel } from 'src/models/role.model';
import { CreateNewRoleInput } from 'src/input-types/role.input-type';

@Resolver()
export class RolesResolver {
  constructor(
    private rolesService: RolesService,
  ) {}

  @Query(returns => [RoleModel])
  getAllRoles(@Args('access_token') accessToken: String) {
    return this.rolesService.findAll();
  }

  @Mutation(returns => RoleModel)
  async createNewRole(@Args('createNewRole') data: CreateNewRoleInput, @Args('access_token') accessToken: String ) {
    return this.rolesService.createNewRole(data);
  }
}

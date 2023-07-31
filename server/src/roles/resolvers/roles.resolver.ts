import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Role } from '@/schemas/role.schema';
import {
  CreateNewRoleInput,
  DeleteRoleInput,
  ParamsRoleInput,
  UpdateRoleInput,
} from '@/input-types/role.input';
import { RoleAndFeatureService } from '@/features/services/role-and-feature.service';
import { RoleAndFeature } from '@/schemas/role-and-feature.schema';
import { UseGuards } from '@nestjs/common';
import { ReadRoleGuard } from '../guards/read-role.guard';
import { CreateRoleGuard } from '../guards/create-role.guard';
import { UpdateRoleGuard } from '../guards/update-role.guard';
import { DeleteRoleGuard } from '../guards/delete-role.guard';
import { RolesService } from '../services/roles.service';

@Resolver(() => Role)
export class RolesResolver {
  constructor(
    private rolesService: RolesService,
    private roleAndFeatureService: RoleAndFeatureService,
  ) {}

  @Query(() => [Role])
  @UseGuards(ReadRoleGuard)
  async getAllRoles(@Args('params') params: ParamsRoleInput) {
    return await this.rolesService.findAll(params);
  }

  @Query(() => Role)
  @UseGuards(ReadRoleGuard)
  async getRole(@Args('id') id: string) {
    return await this.rolesService.findOne(id);
  }

  @Mutation(() => Role)
  @UseGuards(CreateRoleGuard)
  async createNewRole(@Args('createNewRole') data: CreateNewRoleInput) {
    return this.rolesService.createNewRole(data);
  }

  @Mutation(() => Role)
  @UseGuards(UpdateRoleGuard)
  async updateRole(@Args('updateRole') data: UpdateRoleInput) {
    return this.rolesService.updateRole(data);
  }

  @Mutation(() => Role)
  @UseGuards(DeleteRoleGuard)
  async deleteRole(@Args('deleteRole') data: DeleteRoleInput) {
    return this.rolesService.deleteRole(data);
  }

  @ResolveField('features', () => [RoleAndFeature])
  async getRoleAndFeature(@Parent() role: Role) {
    return await this.roleAndFeatureService.findManyByCondition(
      role._id.toString(),
    );
  }
}

import { FeaturesService } from './../features/features.service';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { Role } from '@/schemas/role.schema';
import {
  CreateNewRoleInput,
  DeleteRoleInput,
  UpdateRoleInput,
} from '@/input-types/role.input';
import { RoleAndFeatureService } from '@/features/role-and-feature.service';
import { RoleAndFeature } from '@/schemas/role-and-feature.schema';

@Resolver(() => Role)
export class RolesResolver {
  constructor(
    private rolesService: RolesService,
    private roleAndFeatureService: RoleAndFeatureService,
  ) {}

  @Query(() => [Role])
  async getAllRoles() {
    return await this.rolesService.findAll();
  }

  @Query(() => Role)
  async getRole(@Args('id') id: string) {
    return await this.rolesService.findOne(id);
  }

  @Mutation(() => Role)
  async createNewRole(@Args('createNewRole') data: CreateNewRoleInput) {
    return this.rolesService.createNewRole(data);
  }

  @Mutation(() => Role)
  async updateRole(@Args('updateRole') data: UpdateRoleInput) {
    return this.rolesService.updateRole(data);
  }

  @Mutation(() => Role)
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

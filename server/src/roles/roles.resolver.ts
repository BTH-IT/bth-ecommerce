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
import { CreateNewRoleInput } from '@/input-types/role.input';
import { RoleAndFeatureService } from '@/features/role-and-feature.service';
import { RoleAndFeature } from '@/schemas/role-and-feature.schema';
import { Feature } from '@/schemas/feature.schema';

@Resolver(() => Role)
export class RolesResolver {
  constructor(
    private rolesService: RolesService,
    private featuresService: FeaturesService,
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

  @ResolveField('features', () => [RoleAndFeature])
  async getRoleAndFeature(@Parent() role: Role) {
    return await this.roleAndFeatureService.findManyByCondition(
      role._id.toString(),
    );
  }

  @Mutation(() => Role)
  async createNewRole(@Args('createNewRole') data: CreateNewRoleInput) {
    return this.rolesService.createNewRole(data);
  }
}

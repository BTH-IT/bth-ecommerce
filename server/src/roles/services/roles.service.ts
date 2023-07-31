import { Injectable } from '@nestjs/common';
import {
  CreateNewRoleDto,
  DeleteRoleDto,
  ParamsRoleDto,
  UpdateRoleDto,
} from '@/dto/role.dto';
import { Role } from '@/schemas/role.schema';
import { FeaturesRepository } from '@/features/repositories/features.repo';
import { RoleAndFeatureRepository } from '@/features/repositories/role-and-feature.repo';
import { RolesRepository } from '../repositories/roles.repo';

@Injectable()
export class RolesService {
  constructor(
    private readonly rolesRepository: RolesRepository,
    private readonly featuresRepository: FeaturesRepository,
    private readonly roleAndFeatureRepository: RoleAndFeatureRepository,
  ) {}

  async findAll(params: ParamsRoleDto): Promise<Role[]> {
    const parameters: any = {
      ...params,
    };

    const filter: any = {
      isActive: true,
    };

    for (const key in params) {
      if (key === 'search' && parameters[key] !== null) {
        const search = parameters[key];
        const re = new RegExp(`${search}`, 'i');
        filter['name'] = re;
        continue;
      }

      filter[key] = parameters[key];
    }

    return this.rolesRepository.getByCondition(filter);
  }

  async findOne(id: string): Promise<Role | null> {
    return this.rolesRepository.findByCondition({
      _id: id,
      isActive: true,
    });
  }

  async createNewRole(role: CreateNewRoleDto): Promise<Role> {
    const featureDoc = await this.featuresRepository.findAll();
    const featureList = featureDoc.map((f) => f._id);

    const newRole = await this.rolesRepository.create({
      ...role,
      isActive: true,
      features: featureList,
    });

    featureList.forEach(async (f) => {
      await this.roleAndFeatureRepository.create({
        role: newRole._id,
        feature: f,
        isActive: true,
      });
    });

    return newRole;
  }

  async updateRole(data: UpdateRoleDto) {
    return this.rolesRepository.findByIdAndUpdate(data._id, {
      name: data.name,
      description: data.description,
    });
  }

  async deleteRole(data: DeleteRoleDto) {
    return this.rolesRepository.findByIdAndUpdate(data._id, {
      isActive: false,
    });
  }
}

import { Injectable } from '@nestjs/common';
import { RolesRepository } from './roles.repo';
import { CreateNewRoleDto } from '@/dto/role.dto';
import { Role } from '@/schemas/role.schema';
import { FeaturesRepository } from '@/features/features.repo';
import { RoleAndFeatureRepository } from '@/features/role-and-feature.repo';
import { RoleAndFeature } from '@/schemas/role-and-feature.schema';

@Injectable()
export class RolesService {
  constructor(
    private readonly rolesRepository: RolesRepository,
    private readonly featuresRepository: FeaturesRepository,
    private readonly roleAndFeatureRepository: RoleAndFeatureRepository,
  ) {}

  async findAll(): Promise<Role[]> {
    return this.rolesRepository.findAll();
  }

  async findOne(id: string): Promise<Role | null> {
    return this.rolesRepository.findById(id);
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
      });
    });

    return newRole;
  }
}

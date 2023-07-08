import { Role } from './../interfaces/role.interface';
import { Injectable } from '@nestjs/common';
import { RolesRepository } from './roles.repo';
import { CreateNewRoleDto } from 'src/dto/role.dto';
import { ACTIONLIST } from 'src/utils/constains';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async findAll(): Promise<Role[]> {
    return this.rolesRepository.findAll();
  }

  async findOne(id: String): Promise<Role | undefined> {
    return this.rolesRepository.findById(id as string);
  }

  async createNewRole(role: CreateNewRoleDto): Promise<Role> {
    const newRole = await this.rolesRepository.create({
      ...role,
      isActive: true,
      actions: ACTIONLIST,
    });
    return newRole;
  }
}


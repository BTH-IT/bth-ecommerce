import { BaseRepository } from '@/base.repository';
import { Role } from '@/schemas/role.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RolesRepository extends BaseRepository<Role> {
  constructor(
    @InjectModel(Role.name)
    private readonly roleModel: Model<Role>,
  ) {
    super(roleModel);
  }
}

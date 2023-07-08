import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base.repository';
import { Role } from 'src/interfaces/role.interface';

@Injectable()
export class RolesRepository extends BaseRepository<Role> {
  constructor(
    @InjectModel('roles')
    private readonly roleModel: Model<Role>,
  ) {
    super(roleModel);
  }
}
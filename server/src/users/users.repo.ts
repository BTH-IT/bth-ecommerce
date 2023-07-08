import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../base.repository';
import { User } from 'src/interfaces/user.interface';

@Injectable()
export class UsersRepository extends BaseRepository<User> {
  constructor(
    @InjectModel('users')
    private readonly userModel: Model<User>,
  ) {
    super(userModel);
  }
}
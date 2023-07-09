import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repo';
import { User } from '@/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findOne(email: string): Promise<User | null> {
    return this.usersRepository.findByCondition({ email });
  }

  async findOneWithCondition(
    email: string,
    type: string,
  ): Promise<User | null> {
    return this.usersRepository.findByCondition({ email, type });
  }

  async saveUser(user: any): Promise<User> {
    return this.usersRepository.create(user);
  }

  async update(filter: any, update: any): Promise<User | null> {
    return this.usersRepository.findByConditionAndUpdate(filter, update);
  }
}

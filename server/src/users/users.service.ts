import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { User } from 'src/interfaces/user.interface';
import { UsersRepository } from './users.repo';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) {}

  async findOne(email: String): Promise<User | undefined> {
    return this.usersRepository.findByCondition({email});
  }

  async findOneWithCondition(email: String, type: String): Promise<User | undefined> {
    return this.usersRepository.findByCondition({email, type});
  }

  async saveUser(user: any): Promise<User> {
    return this.usersRepository.create(user);
  }

  private reverse(s) {
    return s.split('').reverse().join('');
  }

  async update(filter, update): Promise<User> {
    if (update.refreshToken) {
      update.refreshToken = await bcrypt.hash(
        this.reverse(update.refreshToken),
        10,
      );
    }
    return this.usersRepository.findByConditionAndUpdate(filter, update);
  }
}
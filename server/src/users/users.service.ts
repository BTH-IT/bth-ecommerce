import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repo';
import { User } from '@/schemas/user.schema';
import { CreateNewUserDto, DeleteUserDto, UpdateUserDto } from '@/dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findOne(email: string): Promise<User | null> {
    return this.usersRepository.findByCondition({ email });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.getByCondition({ isActive: true });
  }

  async createNewUser(user: CreateNewUserDto): Promise<User> {
    return this.usersRepository.create(user);
  }

  async updateUser(data: UpdateUserDto): Promise<User | null> {
    const { _id, ...user } = data;
    return this.usersRepository.findByIdAndUpdate(_id, user);
  }

  async deleteUser(data: DeleteUserDto): Promise<User | null> {
    return this.usersRepository.findByIdAndUpdate(data._id, {
      isActive: false,
    });
  }
}

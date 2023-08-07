import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repo';
import { User } from '@/schemas/user.schema';
import {
  CreateNewUserDto,
  DeleteUserDto,
  ParamsUserDto,
  UpdateUserDto,
} from '@/dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findOne(id: string): Promise<User | null> {
    return this.usersRepository.findById(id);
  }

  async findOneByAccountId(id: string): Promise<User | null> {
    return this.usersRepository.findByCondition({
      account: id,
    });
  }

  async findAll(params: ParamsUserDto): Promise<User[]> {
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
        filter['fullname'] = re;
        filter['gender'] = re;
        filter['phone'] = re;
        filter['address'] = re;
        continue;
      }

      if (key === 'notAccount') continue;

      filter[key] = parameters[key];
    }

    const list = await this.usersRepository.getByCondition(filter);

    if (parameters['notAccount']) {
      return list.filter((user) => {
        return user.account === undefined;
      });
    } else {
      return list;
    }
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

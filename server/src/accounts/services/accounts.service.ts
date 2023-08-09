import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Account } from '@/schemas/account.schema';
import { AccountsRepository } from '../repositories/accounts.repo';
import { ObjectId } from '@/utils/contains';
import {
  CreateNewAccountDto,
  CreateNewAccountWithAvailableUserDto,
  DeleteAccountDto,
  ParamsAccountDto,
  UpdateAccountDto,
} from '@/dto/account.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from '@/users/users.service';

@Injectable()
export class AccountsService {
  constructor(
    private readonly accountsRepository: AccountsRepository,
    private readonly usersService: UsersService,
  ) {}

  async findAll(params: ParamsAccountDto): Promise<Account[]> {
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
        filter['email'] = re;
        continue;
      }

      filter[key] = parameters[key];
    }

    return this.accountsRepository.getByCondition(filter);
  }

  async findOne(email: string): Promise<Account | null> {
    return this.accountsRepository.findByCondition({ email, isActive: true });
  }

  async findOneById(id: string): Promise<Account | null> {
    return this.accountsRepository.findByCondition({
      _id: new ObjectId(id),
      isActive: true,
    });
  }

  async findOneWithCondition(
    email: string,
    type: string,
  ): Promise<Account | null> {
    return this.accountsRepository.findByCondition({
      email,
      type,
      isActive: true,
    });
  }

  async createNewAccount(data: CreateNewAccountDto): Promise<Account> {
    return this.accountsRepository.create(data);
  }

  async createNewAccountWithAvailableUser(
    data: CreateNewAccountWithAvailableUserDto,
  ): Promise<Account> {
    const isExisted = await this.accountsRepository.findByCondition({
      email: data.email,
      type: 'default',
    });

    if (isExisted)
      throw new HttpException(
        'Email is existed in this server',
        HttpStatus.BAD_REQUEST,
      );

    const passwordHash = bcrypt.hashSync(data.password, 10);

    const account = await this.createNewAccount({
      email: data.email,
      password: passwordHash,
      picture: 'https://server.bthung313.site/images/avatar.jpg',
    });

    await this.usersService.updateUser({
      _id: data.user,
      account: account._id.toString(),
    });

    return account;
  }

  async updateAccount(data: UpdateAccountDto): Promise<Account | null> {
    const { _id, ...account } = data;
    return this.accountsRepository.findByConditionAndUpdate(
      {
        _id: new ObjectId(_id),
        type: 'default',
      },
      account,
    );
  }

  async deleteAccount(data: DeleteAccountDto): Promise<Account | null> {
    return this.accountsRepository.findByIdAndUpdate(data._id, {
      isActive: false,
    });
  }
}

import { Injectable } from '@nestjs/common';
import { Account } from '@/schemas/account.schema';
import { AccountsRepository } from '../repositories/accounts.repo';
import { ObjectId } from '@/utils/constains';
import {
  CreateNewAccountDto,
  DeleteAccountDto,
  UpdateAccountDto,
} from '@/dto/account.dto';

@Injectable()
export class AccountsService {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  async findAll(): Promise<Account[]> {
    return this.accountsRepository.getByCondition({ isActive: true });
  }

  async findOne(email: string): Promise<Account | null> {
    return this.accountsRepository.findByCondition({ email, isActive: true });
  }

  async findOneWithCondition(
    email: string,
    type: string,
  ): Promise<Account | null> {
    return this.accountsRepository.findByCondition({ email, type });
  }

  async createNewAccount(data: CreateNewAccountDto): Promise<Account> {
    return this.accountsRepository.create(data);
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

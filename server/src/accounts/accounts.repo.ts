import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../base.repository';
import { Account } from '@/schemas/account.schema';

@Injectable()
export class AccountsRepository extends BaseRepository<Account> {
  constructor(
    @InjectModel(Account.name)
    private readonly accountModel: Model<Account>,
  ) {
    super(accountModel);
  }
}

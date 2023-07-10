import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repo';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/schemas/user.schema';
import { UsersResolver } from './users.resolver';
import { Account, AccountSchema } from '@/schemas/account.schema';
import { Type, TypeSchema } from '@/schemas/type.schema';
import { TypesService } from 'types.service';
import { AccountsService } from '@/accounts/accounts.service';
import { AccountsRepository } from '@/accounts/accounts.repo';
import { TypesRepository } from 'types.repo';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Account.name, schema: AccountSchema },
      { name: Type.name, schema: TypeSchema },
    ]),
  ],
  providers: [
    UsersService,
    UsersRepository,
    UsersResolver,
    TypesService,
    TypesRepository,
    AccountsService,
    AccountsRepository,
  ],
  exports: [UsersService],
})
export class UsersModule {}

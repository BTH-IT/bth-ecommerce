import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from '@/schemas/account.schema';
import { AccountsRepository } from './accounts.repo';
import { AccountsService } from './accounts.service';
import { AccountsResolver } from './accounts.resolver';
import { RolesModule } from '@/roles/roles.module';
import { Role, RoleSchema } from '@/schemas/role.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Account.name, schema: AccountSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
    RolesModule,
  ],
  providers: [AccountsService, AccountsRepository, AccountsResolver],
  exports: [AccountsService],
})
export class AccountsModule {}

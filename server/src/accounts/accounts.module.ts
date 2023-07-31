import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from '@/schemas/account.schema';
import { AccountsRepository } from './repositories/accounts.repo';
import { AccountsService } from './services/accounts.service';
import { AccountsResolver } from './resolvers/accounts.resolver';
import { Role, RoleSchema } from '@/schemas/role.schema';
import { Feature, FeatureSchema } from '@/schemas/feature.schema';
import {
  RoleAndFeature,
  RoleAndFeatureSchema,
} from '@/schemas/role-and-feature.schema';
import { RoleAndFeatureService } from '@/features/services/role-and-feature.service';
import { RoleAndFeatureRepository } from '@/features/repositories/role-and-feature.repo';
import { FeaturesRepository } from '@/features/repositories/features.repo';
import { RolesService } from '@/roles/services/roles.service';
import { RolesRepository } from '@/roles/repositories/roles.repo';
import { User, UserSchema } from '@/schemas/user.schema';
import { UsersService } from '@/users/users.service';
import { UsersRepository } from '@/users/users.repo';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Account.name, schema: AccountSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Feature.name, schema: FeatureSchema },
      { name: RoleAndFeature.name, schema: RoleAndFeatureSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [
    AccountsService,
    AccountsRepository,
    AccountsResolver,
    RoleAndFeatureService,
    RoleAndFeatureRepository,
    FeaturesRepository,
    RolesService,
    RolesRepository,
    UsersService,
    UsersRepository,
  ],
  exports: [AccountsService],
})
export class AccountsModule {}

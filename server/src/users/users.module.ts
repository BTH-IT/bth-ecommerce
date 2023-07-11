import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repo';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/schemas/user.schema';
import { UsersResolver } from './users.resolver';
import { Account, AccountSchema } from '@/schemas/account.schema';
import { Type, TypeSchema } from '@/schemas/type.schema';
import { TypesService } from 'types.service';
import { AccountsService } from '@/accounts/services/accounts.service';
import { AccountsRepository } from '@/accounts/repositories/accounts.repo';
import { TypesRepository } from 'types.repo';
import { Feature, FeatureSchema } from '@/schemas/feature.schema';
import {
  RoleAndFeature,
  RoleAndFeatureSchema,
} from '@/schemas/role-and-feature.schema';
import { RoleAndFeatureService } from '@/features/services/role-and-feature.service';
import { RoleAndFeatureRepository } from '@/features/repositories/role-and-feature.repo';
import { FeaturesRepository } from '@/features/repositories/features.repo';
import { RolesService } from '@/roles/roles.service';
import { RolesRepository } from '@/roles/roles.repo';
import { Role, RoleSchema } from '@/schemas/role.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Account.name, schema: AccountSchema },
      { name: Type.name, schema: TypeSchema },
      { name: Feature.name, schema: FeatureSchema },
      { name: RoleAndFeature.name, schema: RoleAndFeatureSchema },
      { name: Role.name, schema: RoleSchema },
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
    RoleAndFeatureService,
    RoleAndFeatureRepository,
    FeaturesRepository,
    RolesService,
    RolesRepository,
  ],
  exports: [UsersService],
})
export class UsersModule {}

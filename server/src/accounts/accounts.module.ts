import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from '@/schemas/account.schema';
import { AccountsRepository } from './repositories/accounts.repo';
import { AccountsService } from './services/accounts.service';
import { AccountsResolver } from './resolvers/accounts.resolver';
import { RolesModule } from '@/roles/roles.module';
import { Role, RoleSchema } from '@/schemas/role.schema';
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

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Account.name, schema: AccountSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Feature.name, schema: FeatureSchema },
      { name: RoleAndFeature.name, schema: RoleAndFeatureSchema },
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
  ],
  exports: [AccountsService],
})
export class AccountsModule {}

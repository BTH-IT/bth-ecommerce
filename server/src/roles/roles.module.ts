import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesResolver } from './roles.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesRepository } from './roles.repo';
import { Role, RoleSchema } from '@/schemas/role.schema';
import { UsersModule } from '@/users/users.module';
import { FeaturesModule } from '@/features/features.module';
import { FeaturesRepository } from '@/features/repositories/features.repo';
import { RoleAndFeatureRepository } from '@/features/repositories/role-and-feature.repo';
import {
  RoleAndFeature,
  RoleAndFeatureSchema,
} from '@/schemas/role-and-feature.schema';
import { Feature, FeatureSchema } from '@/schemas/feature.schema';
import { RoleAndFeatureService } from '@/features/services/role-and-feature.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: RoleAndFeature.name, schema: RoleAndFeatureSchema },
      { name: Feature.name, schema: FeatureSchema },
    ]),
    UsersModule,
  ],
  providers: [
    RolesService,
    RolesResolver,
    RolesRepository,
    FeaturesRepository,
    RoleAndFeatureRepository,
    RoleAndFeatureService,
  ],
  exports: [RolesService],
})
export class RolesModule {}

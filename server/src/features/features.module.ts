import { Module } from '@nestjs/common';
import { FeaturesService } from './services/features.service';
import { FeaturesResolver } from './resolvers/features.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Feature, FeatureSchema } from '@/schemas/feature.schema';
import {
  RoleAndFeature,
  RoleAndFeatureSchema,
} from '@/schemas/role-and-feature.schema';
import { FeaturesRepository } from './repositories/features.repo';
import { RoleAndFeatureRepository } from './repositories/role-and-feature.repo';
import { Role, RoleSchema } from '@/schemas/role.schema';
import { RoleAndFeatureService } from './services/role-and-feature.service';
import { RolesService } from '@/roles/services/roles.service';
import { RolesRepository } from '@/roles/repositories/roles.repo';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Feature.name,
        schema: FeatureSchema,
      },
      {
        name: RoleAndFeature.name,
        schema: RoleAndFeatureSchema,
      },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  providers: [
    FeaturesService,
    FeaturesResolver,
    FeaturesRepository,
    RoleAndFeatureRepository,
    RoleAndFeatureService,
    RolesService,
    RolesRepository,
  ],
  exports: [FeaturesService],
})
export class FeaturesModule {}

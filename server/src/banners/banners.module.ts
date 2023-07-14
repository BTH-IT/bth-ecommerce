import { Module } from '@nestjs/common';
import { BannersService } from './services/banners.service';
import { BannersResolver } from './resolvers/banners.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Banner, BannerSchema } from '@/schemas/banner.schema';
import { Feature, FeatureSchema } from '@/schemas/feature.schema';
import {
  RoleAndFeature,
  RoleAndFeatureSchema,
} from '@/schemas/role-and-feature.schema';
import { Role, RoleSchema } from '@/schemas/role.schema';
import { BannersRepository } from './repositories/banners.repo';
import { RoleAndFeatureService } from '@/features/services/role-and-feature.service';
import { RoleAndFeatureRepository } from '@/features/repositories/role-and-feature.repo';
import { FeaturesRepository } from '@/features/repositories/features.repo';
import { RolesService } from '@/roles/roles.service';
import { RolesRepository } from '@/roles/roles.repo';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Banner.name, schema: BannerSchema },
      { name: Feature.name, schema: FeatureSchema },
      { name: RoleAndFeature.name, schema: RoleAndFeatureSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  providers: [
    BannersService,
    BannersResolver,
    BannersRepository,
    RoleAndFeatureService,
    RoleAndFeatureRepository,
    FeaturesRepository,
    RolesService,
    RolesRepository,
  ],
})
export class BannersModule {}

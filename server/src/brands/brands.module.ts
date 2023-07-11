import { Module } from '@nestjs/common';
import { BrandsService } from './services/brands.service';
import { BrandsResolver } from './resolver/brands.resolver';
import { BrandsRepository } from './repositories/brands.repo';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand, BrandSchema } from '@/schemas/brand.schema';
import { RoleAndFeatureService } from '@/features/services/role-and-feature.service';
import { RoleAndFeatureRepository } from '@/features/repositories/role-and-feature.repo';
import { FeaturesRepository } from '@/features/repositories/features.repo';
import { RolesService } from '@/roles/roles.service';
import { RolesRepository } from '@/roles/roles.repo';
import { Feature, FeatureSchema } from '@/schemas/feature.schema';
import {
  RoleAndFeature,
  RoleAndFeatureSchema,
} from '@/schemas/role-and-feature.schema';
import { Role, RoleSchema } from '@/schemas/role.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Brand.name, schema: BrandSchema },
      { name: Feature.name, schema: FeatureSchema },
      { name: RoleAndFeature.name, schema: RoleAndFeatureSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  providers: [
    BrandsService,
    BrandsResolver,
    BrandsRepository,
    RoleAndFeatureService,
    RoleAndFeatureRepository,
    FeaturesRepository,
    RolesService,
    RolesRepository,
  ],
  exports: [BrandsService],
})
export class BrandsModule {}

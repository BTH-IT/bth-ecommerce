import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Supplier, SupplierSchema } from '@/schemas/supplier.schema';
import { SuppliersRepository } from './suppliers.repo';
import { SuppliersService } from './suppliers.service';
import { SuppliersResolver } from './suppliers.resolver';
import { Role, RoleSchema } from '@/schemas/role.schema';
import { RolesModule } from '@/roles/roles.module';
import {
  RoleAndFeature,
  RoleAndFeatureSchema,
} from '@/schemas/role-and-feature.schema';
import { RoleAndFeatureService } from '@/features/services/role-and-feature.service';
import { RoleAndFeatureRepository } from '@/features/repositories/role-and-feature.repo';
import { FeaturesModule } from '@/features/features.module';
import { FeaturesRepository } from '@/features/repositories/features.repo';
import { Feature, FeatureSchema } from '@/schemas/feature.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Supplier.name, schema: SupplierSchema },
      { name: Role.name, schema: RoleSchema },
      { name: RoleAndFeature.name, schema: RoleAndFeatureSchema },
      { name: Feature.name, schema: FeatureSchema },
    ]),
    RolesModule,
  ],
  providers: [
    SuppliersService,
    SuppliersResolver,
    SuppliersRepository,
    RoleAndFeatureService,
    RoleAndFeatureRepository,
    FeaturesRepository,
  ],
  exports: [SuppliersService],
})
export class SuppliersModule {}

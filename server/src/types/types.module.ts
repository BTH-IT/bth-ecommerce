import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Type, TypeSchema } from '@/schemas/type.schema';
import { TypesService } from 'types.service';
import { TypesRepository } from 'types.repo';
import { TypesResolver } from 'types.resolver';
import { Feature, FeatureSchema } from '@/schemas/feature.schema';
import {
  RoleAndFeature,
  RoleAndFeatureSchema,
} from '@/schemas/role-and-feature.schema';
import { RolesModule } from '@/roles/roles.module';
import { RoleAndFeatureService } from '@/features/services/role-and-feature.service';
import { RoleAndFeatureRepository } from '@/features/repositories/role-and-feature.repo';
import { FeaturesRepository } from '@/features/repositories/features.repo';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Type.name, schema: TypeSchema },
      { name: Feature.name, schema: FeatureSchema },
      { name: RoleAndFeature.name, schema: RoleAndFeatureSchema },
    ]),
    RolesModule,
  ],
  providers: [
    TypesService,
    TypesRepository,
    TypesResolver,
    RoleAndFeatureService,
    RoleAndFeatureRepository,
    FeaturesRepository,
  ],
  exports: [TypesService],
})
export class TypesModule {}

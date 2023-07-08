import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesResolver } from './roles.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleSchema } from 'src/schemas/role.schema';
import { RolesRepository } from './roles.repo';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: "roles", schema: RoleSchema }]), UsersModule],
  providers: [RolesService, RolesResolver, RolesRepository],
  exports: [RolesService]
})
export class RolesModule {}

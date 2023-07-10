import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Type, TypeSchema } from '@/schemas/type.schema';
import { TypesService } from 'types.service';
import { TypesRepository } from 'types.repo';
import { TypesResolver } from 'types.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Type.name, schema: TypeSchema }]),
  ],
  providers: [TypesService, TypesRepository, TypesResolver],
  exports: [TypesService],
})
export class TypesModule {}

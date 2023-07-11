import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { FeaturesModule } from './features/features.module';
import { BrandsModule } from './brands/brands.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { TypesModule } from 'types.module';
import { WarrantiesModule } from './warranties/warranties.module';
import { ImportOrdersModule } from './import-orders/import-orders.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI || ''),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gpl'),
      sortSchema: true,
    }),
    ProductsModule,
    UsersModule,
    AuthModule,
    RolesModule,
    FeaturesModule,
    BrandsModule,
    SuppliersModule,
    TypesModule,
    WarrantiesModule,
    ImportOrdersModule,
    OrdersModule,
  ],
})
export class AppModule {}

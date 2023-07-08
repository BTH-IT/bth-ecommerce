import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repo';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "users", schema: UserSchema }]),
  ],
  providers: [UsersService, UsersRepository],
  exports: [UsersService]
})
export class UsersModule {}

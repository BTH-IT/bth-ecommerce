import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccountsModule } from '@/accounts/accounts.module';

@Module({
  imports: [
    AccountsModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('SECRETKEY'),
        signOptions: {
          expiresIn: `${configService.get('EXPIRESIN')}`,
        },
      }),
    }),
  ],
  providers: [AuthService, GoogleStrategy, JwtService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

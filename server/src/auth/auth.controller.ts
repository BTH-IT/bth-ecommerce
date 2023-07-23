import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  Post,
  Req,
  Res,
  Get,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from '@/dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data);
  }

  @Post('register')
  async register(@Body() data: RegisterDto) {
    return await this.authService.register(data);
  }

  @Get('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@Req() req: any) {
    return this.authService.logout(req.user);
  }

  @Post('change-password')
  @UseGuards(AuthGuard('jwt'))
  async changePassword(
    @Body() data: { email: string; oldPassword: string; newPassword: string },
  ) {
    return this.authService.changePassword(data);
  }

  @Get('refresh-token')
  @UseGuards(AuthGuard('jwt'))
  async refreshToken(@Req() req: any) {
    return this.authService.refreshToken(req.user);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Req() req: any) {
    return this.authService.getProfile(req.user);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    console.log('object');
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: any, @Res() res: any) {
    const user = await this.authService.loginWithGoogle(req);
    return res.redirect('https://www.facebook.com/BTH312003');
  }
}

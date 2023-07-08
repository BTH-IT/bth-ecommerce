import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/dto/auth.dto';
import { User } from 'src/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: String) {
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    const {...usr}: any = user;
    const {password, ...newUser} = usr._doc; 

    return newUser;
  }

  async login(loginInput: LoginDto) {
    const user = await this.usersService.findOneWithCondition(loginInput.email, "default");

    if (!user) {
      throw new HttpException("Email not found", HttpStatus.UNAUTHORIZED);
    }

    const {...usr}: any = user;
    const {password, ...newUser} = usr._doc; 

    const isVerified = bcrypt.compareSync(loginInput.password as string, user.password as string);

    if (!isVerified) {
      throw new HttpException("Password went something wrong", HttpStatus.UNAUTHORIZED);
    }

    const refreshToken = this.jwtService.sign(newUser, {
      secret: process.env.SECRETKEY,
      expiresIn: process.env.EXPIRESIN_REFRESHTOKEN
    })

    const accessToken = this.jwtService.sign(newUser, {
      secret: process.env.SECRETKEY,
      expiresIn: process.env.EXPIRESIN
    });
    
    return {
      newUser,
      accessToken,
      refreshToken,
    };
  }

  async loginWithGoogle(req: any) {
    if (!req.user) {
      return new HttpException("No user login", HttpStatus.UNAUTHORIZED);
    }
    let user = await this.usersService.findOneWithCondition(req.user.email, "google");

    if (!user) {
      req.user.password = req.user.email;
      req.user.role = "64a97d2c55cfadfc9822f74a";
      req.user.type = 'google';
      user = await this.usersService.saveUser(req.user);
    }

    const {...usr}: any = user;
    const {password, ...newUser} = usr._doc; 

    return newUser;
  }

  async register(data: LoginDto) {
    if (!data) throw new HttpException("Invalid data", HttpStatus.BAD_REQUEST);

    const {email, password} = data;

    const isExisted = await this.usersService.findOneWithCondition(email, "default");

    if (isExisted) throw new HttpException("Email is existed in this server", HttpStatus.BAD_REQUEST);

    const passwordHash = bcrypt.hashSync(password, 10);

    const user = await this.usersService.saveUser({
      email,
      password: passwordHash,
      picture: process.env.PICTURE_DEFAULT,
      type: "default",
      role: "64a97d2c55cfadfc9822f74a",
    })

    const {...usr}: any = user;
    const {password: pwd, ...newUser} = usr._doc;

    return newUser;
  }

  async logout(data: User) {
    if (!data) throw new HttpException("No data", HttpStatus.BAD_REQUEST);

    throw new HttpException("Logout successfully!", HttpStatus.OK);
  }

  async refreshToken(data: User) {
    if (!data) throw new HttpException("No data", HttpStatus.BAD_REQUEST);

    const user = await this.validateUser(data.email);

    const accessToken = this.jwtService.sign(user, {
      secret: process.env.SECRETKEY,
      expiresIn: process.env.EXPIRESIN
    });

    return {accessToken};
  }

  async getProfile(data: User) {
    if (!data) throw new HttpException("No data", HttpStatus.BAD_REQUEST);

    const user = await this.validateUser(data.email);

    return user;
  }
}

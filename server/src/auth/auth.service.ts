import { UsersService } from './../users/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from '@/dto/auth.dto';
import { AccountsService } from '@/accounts/services/accounts.service';
import { Account } from '@/schemas/account.schema';

@Injectable()
export class AuthService {
  constructor(
    private accountsService: AccountsService,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateAccount(email: string) {
    const account = await this.accountsService.findOne(email);

    if (!account) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    const { ...acc }: any = account;
    const { password, ...newAccount } = acc._doc;

    return newAccount;
  }

  async login(loginInput: LoginDto) {
    const account = await this.accountsService.findOneWithCondition(
      loginInput.email,
      loginInput.type,
    );

    if (!account) {
      throw new HttpException('Email not found', HttpStatus.UNAUTHORIZED);
    }

    const isVerified = bcrypt.compareSync(
      loginInput.password as string,
      account.password as string,
    );

    if (!isVerified) {
      throw new HttpException(
        'Password went something wrong',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const { ...acc }: any = account;
    const { password, ...newAccount } = acc._doc;

    const user = await this.usersService.findOneByAccountId(
      newAccount._id.toString(),
    );

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    user.account = newAccount;

    const refreshToken = this.jwtService.sign(newAccount, {
      secret: process.env.SECRETKEY,
      expiresIn: process.env.EXPIRESIN_REFRESHTOKEN,
    });

    const accessToken = this.jwtService.sign(newAccount, {
      secret: process.env.SECRETKEY,
      expiresIn: process.env.EXPIRESIN,
    });

    return {
      newAccount,
      user,
      accessToken,
      refreshToken,
    };
  }

  async loginWithGoogle(req: any) {
    if (!req.user) {
      throw new HttpException('No Account login', HttpStatus.UNAUTHORIZED);
    }

    const { email, fullname } = req.user;

    let account = await this.accountsService.findOneWithCondition(
      email,
      'google',
    );

    if (!account) {
      req.user.password = bcrypt.hashSync(
        email.split('').reverse().join('') +
          fullname.split('').reverse().join(''),
        10,
      );
      req.user.type = 'google';
      account = await this.accountsService.createNewAccount(req.user);
    }

    const { ...acc }: any = account;
    const { password, ...newAccount } = acc._doc;

    const user = await this.usersService.createNewUser({
      account: newAccount._id,
      fullname,
      gender: '',
      birthYear: 0,
      phone: '',
      address: '',
    });

    user.account = newAccount;

    return {
      newAccount,
      user,
    };
  }

  async register(data: RegisterDto) {
    if (!data) throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);

    const { email, password, fullname, gender, birthYear, phone, address } =
      data;

    const isExisted = await this.accountsService.findOneWithCondition(
      email,
      'default',
    );

    if (isExisted)
      throw new HttpException(
        'Email is existed in this server',
        HttpStatus.BAD_REQUEST,
      );

    const passwordHash = bcrypt.hashSync(password, 10);

    const account = await this.accountsService.createNewAccount({
      email,
      password: passwordHash,
      picture: 'https://server.bthung313.site/images/avatar.jpg',
    });

    const { ...acc }: any = account;
    const { password: pwd, ...newAccount } = acc._doc;

    await this.usersService.createNewUser({
      fullname,
      gender,
      birthYear,
      phone,
      address,
      account: newAccount._id,
    });

    return newAccount;
  }

  async logout(data: Account) {
    if (!data) throw new HttpException('No data', HttpStatus.BAD_REQUEST);

    throw new HttpException('Logout successfully!', HttpStatus.OK);
  }

  async refreshToken(data: Account) {
    if (!data) throw new HttpException('No data', HttpStatus.BAD_REQUEST);

    const account = await this.validateAccount(data.email);

    const accessToken = this.jwtService.sign(account, {
      secret: process.env.SECRETKEY,
      expiresIn: process.env.EXPIRESIN,
    });

    return { accessToken };
  }

  async getProfile(data: Account) {
    if (!data) throw new HttpException('No data', HttpStatus.BAD_REQUEST);

    const account = await this.validateAccount(data.email);
    const user = await this.usersService.findOneByAccountId(
      account._id.toString(),
    );

    return {
      account,
      user,
    };
  }

  async changePassword(data: {
    email: string;
    oldPassword: string;
    newPassword: string;
  }) {
    if (!data) throw new HttpException('No data', HttpStatus.BAD_REQUEST);

    const account = await this.accountsService.findOne(data.email);

    if (!account) throw new HttpException('No account', HttpStatus.BAD_REQUEST);

    const isVerified = bcrypt.compareSync(data.oldPassword, account.password);

    if (!isVerified) {
      throw new HttpException(
        'Old Password is not valid!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const passwordHash = bcrypt.hashSync(data.newPassword, 10);

    await this.accountsService.updateAccount({
      _id: account._id.toString(),
      password: passwordHash,
    });

    return true;
  }
}

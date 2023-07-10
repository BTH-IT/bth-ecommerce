import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '@/dto/auth.dto';
import { AccountsService } from '@/accounts/accounts.service';
import { Account } from '@/schemas/account.schema';

@Injectable()
export class AuthService {
  constructor(
    private accountsService: AccountsService,
    private jwtService: JwtService,
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
    const Account = await this.accountsService.findOneWithCondition(
      loginInput.email,
      'default',
    );

    if (!Account) {
      throw new HttpException('Email not found', HttpStatus.UNAUTHORIZED);
    }

    const { ...acc }: any = Account;
    const { password, ...newAccount } = acc._doc;

    const isVerified = bcrypt.compareSync(
      loginInput.password as string,
      Account.password as string,
    );

    if (!isVerified) {
      throw new HttpException(
        'Password went something wrong',
        HttpStatus.UNAUTHORIZED,
      );
    }

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
      accessToken,
      refreshToken,
    };
  }

  async loginWithGoogle(req: any) {
    if (!req.account) {
      return new HttpException('No Account login', HttpStatus.UNAUTHORIZED);
    }
    let account = await this.accountsService.findOneWithCondition(
      req.account.email,
      'google',
    );

    if (!account) {
      req.account.password = bcrypt.hashSync(
        req.account.email.reverse() + req.account.email,
        10,
      );
      req.account.type = 'google';
      account = await this.accountsService.createNewAccount(req.account);
    }

    const { ...acc }: any = account;
    const { password, ...newAccount } = acc._doc;

    return newAccount;
  }

  async register(data: LoginDto) {
    if (!data) throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);

    const { email, password } = data;

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

    const Account = await this.accountsService.createNewAccount({
      email,
      password: passwordHash,
    });

    const { ...acc }: any = Account;
    const { password: pwd, ...newAccount } = acc._doc;

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

    const Account = await this.validateAccount(data.email);

    return Account;
  }
}

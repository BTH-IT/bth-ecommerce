import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from '@/schemas/user.schema';
import {
  CreateNewUserInput,
  DeleteUserInput,
  UpdateUserInput,
} from '@/input-types/user.input';
import { Account } from '@/schemas/account.schema';
import { Type } from '@/schemas/type.schema';
import { TypesService } from 'types.service';
import { AccountsService } from '@/accounts/accounts.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private accountsService: AccountsService,
    private typesService: TypesService,
  ) {}

  @Query(() => [User])
  async getAllUsers() {
    return await this.usersService.findAll();
  }

  @Query(() => User)
  async getUser(@Args('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Mutation(() => User)
  async createNewUser(@Args('createNewUser') data: CreateNewUserInput) {
    return this.usersService.createNewUser(data);
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUser') data: UpdateUserInput) {
    return this.usersService.updateUser(data);
  }

  @Mutation(() => User)
  async deleteUser(@Args('deleteUser') data: DeleteUserInput) {
    return this.usersService.deleteUser(data);
  }

  @ResolveField('account', () => Account)
  async getAccount(@Parent() user: User) {
    return this.accountsService.findOne(user.account._id.toString());
  }
  @ResolveField('type', () => Type)
  async getType(@Parent() user: User) {
    return this.typesService.findOne(user.type._id.toString());
  }
}

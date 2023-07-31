import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AccountsService } from '../services/accounts.service';
import { Account } from '@/schemas/account.schema';
import {
  CreateNewAccountInput,
  CreateNewAccountWithAvailableUserInput,
  DeleteAccountInput,
  ParamsAccountInput,
  UpdateAccountInput,
} from '@/input-types/account.input';
import { Role } from '@/schemas/role.schema';
import { RolesService } from '@/roles/services/roles.service';
import { UseGuards } from '@nestjs/common';
import { ReadAccountGuard } from '../guards/read-account.guard';
import { CreateAccountGuard } from '../guards/create-account.guard';
import { UpdateAccountGuard } from '../guards/update-account.guard';
import { DeleteAccountGuard } from '../guards/delete-account.guard';

@Resolver(() => Account)
export class AccountsResolver {
  constructor(
    private accountsService: AccountsService,
    private rolesService: RolesService,
  ) {}

  @Query(() => [Account])
  @UseGuards(ReadAccountGuard)
  async getAllAccounts(@Args('params') params: ParamsAccountInput) {
    return await this.accountsService.findAll(params);
  }

  @Query(() => Account)
  @UseGuards(ReadAccountGuard)
  async getAccount(@Args('id') id: string) {
    return await this.accountsService.findOne(id);
  }

  @Mutation(() => Account)
  @UseGuards(CreateAccountGuard)
  async createNewAccount(
    @Args('createNewAccount') data: CreateNewAccountInput,
  ) {
    return this.accountsService.createNewAccount(data);
  }

  @Mutation(() => Account)
  @UseGuards(CreateAccountGuard)
  async createNewAccountWithAvailableUser(
    @Args('createNewAccountWithAvailableUser')
    data: CreateNewAccountWithAvailableUserInput,
  ) {
    return this.accountsService.createNewAccountWithAvailableUser(data);
  }

  @Mutation(() => Account)
  @UseGuards(UpdateAccountGuard)
  async updateAccount(@Args('updateAccount') data: UpdateAccountInput) {
    return this.accountsService.updateAccount(data);
  }

  @Mutation(() => Account)
  @UseGuards(DeleteAccountGuard)
  async deleteAccount(@Args('deleteAccount') data: DeleteAccountInput) {
    return this.accountsService.deleteAccount(data);
  }

  @ResolveField('role', () => Role)
  async getRole(@Parent() account: Account) {
    return this.rolesService.findOne(account.role._id.toString());
  }
}

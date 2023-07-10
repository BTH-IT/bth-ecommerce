import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AccountsService } from './accounts.service';
import { Account } from '@/schemas/account.schema';
import {
  CreateNewAccountInput,
  DeleteAccountInput,
  UpdateAccountInput,
} from '@/input-types/account.input';
import { Role } from '@/schemas/role.schema';
import { RolesService } from '@/roles/roles.service';

@Resolver(() => Account)
export class AccountsResolver {
  constructor(
    private accountsService: AccountsService,
    private rolesService: RolesService,
  ) {}

  @Query(() => [Account])
  async getAllAccounts() {
    return await this.accountsService.findAll();
  }

  @Query(() => Account)
  async getAccount(@Args('id') id: string) {
    return await this.accountsService.findOne(id);
  }

  @Mutation(() => Account)
  async createNewAccount(
    @Args('createNewAccount') data: CreateNewAccountInput,
  ) {
    return this.accountsService.createNewAccount(data);
  }

  @Mutation(() => Account)
  async updateAccount(@Args('updateAccount') data: UpdateAccountInput) {
    return this.accountsService.updateAccount(data);
  }

  @Mutation(() => Account)
  async deleteAccount(@Args('deleteAccount') data: DeleteAccountInput) {
    return this.accountsService.deleteAccount(data);
  }

  @ResolveField('role', () => Role)
  async getRole(@Parent() account: Account) {
    return this.rolesService.findOne(account.role._id.toString());
  }
}

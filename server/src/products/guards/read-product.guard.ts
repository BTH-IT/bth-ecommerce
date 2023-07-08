import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { RolesService } from 'src/roles/roles.service';
import { BaseRolesGuard } from '../../base.guard';
import { ACTION } from 'src/utils/constains';

@Injectable()
export class ReadProductGuard extends BaseRolesGuard implements CanActivate {
  constructor(
    private readonly rolesService: RolesService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return await this.verifyAuthorization(context, ACTION.READ, this.rolesService);
  }
}
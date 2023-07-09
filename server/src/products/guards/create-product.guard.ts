import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { BaseRolesGuard } from '../../base.guard';
import { ACTION } from '@/utils/constains';
import { RolesService } from '@/roles/roles.service';

@Injectable()
export class CreateProductGuard extends BaseRolesGuard implements CanActivate {
  constructor(private readonly rolesService: RolesService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return await this.verifyAuthorization(
      context,
      ACTION.CREATE,
      this.rolesService,
    );
  }
}

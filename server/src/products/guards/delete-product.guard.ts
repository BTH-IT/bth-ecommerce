import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { BaseRolesGuard } from '../../base.guard';
import { RolesService } from '@/roles/roles.service';
import { ACTION } from '@/utils/constains';

@Injectable()
export class DeleteProductGuard extends BaseRolesGuard implements CanActivate {
  constructor(private readonly rolesService: RolesService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return await this.verifyAuthorization(
      context,
      ACTION.DELETE,
      this.rolesService,
    );
  }
}

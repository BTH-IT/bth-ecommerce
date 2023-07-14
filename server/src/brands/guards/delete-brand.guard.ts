import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { BaseRolesGuard } from '../../base.guard';
import { RolesService } from '@/roles/roles.service';
import { ACTION, FEATURE } from '@/utils/contains';
import { RoleAndFeatureService } from '@/features/services/role-and-feature.service';

@Injectable()
export class DeleteBrandGuard extends BaseRolesGuard implements CanActivate {
  constructor(
    private readonly rolesService: RolesService,
    private readonly roleAndFeatureService: RoleAndFeatureService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return await this.verifyAuthorization(
      context,
      ACTION.DELETE,
      this.rolesService,
      this.roleAndFeatureService,
      FEATURE.BRAND,
    );
  }
}

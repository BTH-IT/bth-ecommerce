import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { BaseRolesGuard } from '../../base.guard';
import { ACTION, FEATURE } from '@/utils/contains';
import { RolesService } from '@/roles/roles.service';
import { RoleAndFeatureService } from '@/features/services/role-and-feature.service';

@Injectable()
export class CreateBrandGuard extends BaseRolesGuard implements CanActivate {
  constructor(
    private readonly rolesService: RolesService,
    private readonly roleAndFeatureService: RoleAndFeatureService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return await this.verifyAuthorization(
      context,
      ACTION.CREATE,
      this.rolesService,
      this.roleAndFeatureService,
      FEATURE.BRAND,
    );
  }
}

import { Injectable, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import { RolesService } from './roles/roles.service';
import { RoleAndFeatureService } from './features/services/role-and-feature.service';

@Injectable()
export class BaseRolesGuard {
  async verifyAuthorization(
    context: ExecutionContext,
    action: string,
    rolesService: RolesService,
    roleAndFeatureService: RoleAndFeatureService,
    featureName: string,
  ): Promise<any> {
    const ctx = GqlExecutionContext.create(context).getContext();

    const accessToken = ctx.req.headers.authorization.split(' ')[1];

    const user = JSON.parse(JSON.stringify(jwt.decode(accessToken)));

    const now = Math.ceil(new Date().getTime() / 1000);

    if (!user || now > user.exp) return false;

    user.role = await rolesService.findOne(user.role);

    if (!user.role) return false;

    const features = await roleAndFeatureService.findManyByCondition(
      user.role._id.toString(),
    );

    const feature = features.find(
      (f) =>
        f.feature.name.toUpperCase() === featureName.toUpperCase() &&
        f.feature.isActive,
    );

    if (!feature) return false;

    return user.role.isActive && feature.actions.includes(action);
  }
}

import { Injectable, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from "jsonwebtoken";
import { RolesService } from './roles/roles.service';

@Injectable()
export class BaseRolesGuard {
  async verifyAuthorization(context: ExecutionContext, action: String, rolesService: RolesService): Promise<any> {
    const ctx = GqlExecutionContext.create(context).getContext();

    const accessToken = ctx.req.headers.access_token;

    const user = JSON.parse(JSON.stringify(jwt.decode(accessToken)));

    const now = Math.ceil((new Date()).getTime() / 1000);

    if (!user || now > user.exp) return false;

    user.role = await rolesService.findOne(user.role);

    return user.role.isActive && user.role.actions.includes(action);
  }
}
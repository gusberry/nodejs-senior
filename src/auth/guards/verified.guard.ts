import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { JWTPayload } from '../dto/jwt.payload';
import { IS_ALLOWED_UNVERIFIED } from '../decorators/verified.decorator';

@Injectable()
export class VerifiedGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const canSkipVerification = this.reflector.getAllAndOverride<boolean>(
      IS_ALLOWED_UNVERIFIED,
      [context.getHandler(), context.getClass()],
    );

    if (canSkipVerification) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user as JWTPayload;

    if (!user) {
      return false;
    }

    return user.isVerified;
  }
}

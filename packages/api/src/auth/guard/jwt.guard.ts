import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

/**
 * JWT 警卫
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  /**
   * 判断是否需要检验 JWT
   * @param context
   */
  async canActivate(context: ExecutionContext): Promise<any> {
    // 用于处理全局部分接口不需要鉴权的接口
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }


  handleRequest(err: any, user: any): any {
    if (err || !user) {
      throw err || new UnauthorizedException({}, '令牌错误');
    }

    return user;
  }
}

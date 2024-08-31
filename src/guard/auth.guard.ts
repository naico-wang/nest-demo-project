/*
* 守卫用于确定给定请求是否可以由路由处理，它们通常用于认证。
 */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  validateRequest(request): boolean {
    // 这里可以放置认证逻辑
    return true; // 假设通过认证
  }
}

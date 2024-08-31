/*
 * 自定义装饰器在 NestJS 中用于简化代码复用，可以在控制器或服务中使用自定义逻辑。
 * 可以极大地简化从请求中提取特定值的重复代码，提高代码可读性和复用性。
 * 假设我们想创建一个自定义装饰器，用来提取请求头中的某个值并将其注入到控制器的方法参数中。
 */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/*
 * createParamDecorator 是 NestJS 提供的工具，用来创建自定义装饰器。
 * 在这个例子中，User 装饰器从请求的 headers 中提取 user 字段并将其返回。
 */
export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers['user']; // 从请求头中获取 'user' 字段
  },
);

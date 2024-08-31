/*
 * 控制器用于定义应用的 API 端点，它们负责处理客户端的 HTTP 请求，并返回响应。
 * https://docs.nestjs.com/controllers
 */

import {
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Query,
  UseFilters,
  HttpException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '../guard/auth.guard';
import { LoggingInterceptor } from '../interceptor/logging.interceptor';
import { HttpExceptionFilter } from '../filter/http-exception.filter';
import { User } from '../decorator/user.decorator';

/*
 * @Controller() 装饰器用于定义控制器，它可以接收路径参数，以定义该控制器的基础路径。
 *
 */
@Controller('app')
export class AppController {
  /* 依赖注入是 NestJS 的核心功能之一，通过它可以轻松地管理对象的创建和生命周期。
   * AppController 依赖 AppService。
   * NestJS 自动将 AppService 注入 AppController。
   * 这里 AppService 被注入到控制器中，用于处理业务逻辑。
   */
  constructor(private readonly appService: AppService) {}

  @Get('greeting')
  getHello(): string {
    return this.appService.getHello();
  }

  /*
   * https://docs.nestjs.com/guards
   * 在控制器中使用守卫
   */
  @Get('protected')
  @UseGuards(AuthGuard)
  getProtected() {
    return 'This route is protected';
  }

  /*
   * https://docs.nestjs.com/middleware
   * 在控制器中使用拦截器
   */
  @Get('log')
  @UseInterceptors(LoggingInterceptor)
  getLog() {
    return 'This route is being logged';
  }

  /*
   * https://docs.nestjs.com/pipes
   * 在控制器中使用管道
   */
  @Get('validate')
  @UsePipes(ValidationPipe)
  validateInput(@Query('input') input: string) {
    return `Validated input: ${input}`;
  }

  /*
   * https://docs.nestjs.com/exception-filters
   * 在控制器中使用过滤器
   */
  @Get('error')
  @UseFilters(HttpExceptionFilter)
  throwError() {
    throw new HttpException('Forbidden', 403);
  }

  /*
   * https://docs.nestjs.com/custom-decorators
   * 使用自定义装饰器
   * @User() 装饰器被应用到 getProfile() 方法的参数上，用于获取用户信息。
   */
  @Get('profile')
  getProfile(@User() user: string) {
    // 使用自定义装饰器获取 user
    return `User: ${user}`;
  }
}

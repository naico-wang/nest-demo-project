/*
 * 模块是 NestJS 应用的基本组成部分。
 * 每个应用至少有一个模块，即根模块（AppModule）。
 */
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from '../middleware/logger.middleware';
import { CustomAppService } from './custom-app.service';
import { getConfigAsync } from '../utils/index';

/*
 * @Module() 装饰器定义了模块，它会将控制器和服务组合起来。
 */
@Module({
  imports: [],
  /*
   * https://docs.nestjs.com/controllers
   * 控制器负责处理传入请求并向客户端返回响应。
   */
  controllers: [AppController],
  /*
   * https://docs.nestjs.com/providers
   * https://docs.nestjs.com/fundamentals/custom-providers
   * 提供器是 Nest 中的一个基本概念。许多基本的 Nest 类可以被视为提供器 - 服务、存储库、工厂、助手等等。提供器的主要思想是它可以作为依赖注入；这意味着对象之间可以创建各种关系，并且 "接线" 这些对象的功能很大程度上可以委托给 Nest 运行时系统。
   * 这里的示例包含了标准提供器以及一些自定义提供器的用法，详情请看文档
   */
  providers: [
    {
      provide: AppService, // 指定接口或标识符
      useClass: CustomAppService, // 自定义实现
    },
    {
      provide: 'CONFIG_OPTIONS',
      useValue: { apiKey: '123456', baseUrl: 'https://api.example.com' }, // 静态对象
    },
    {
      provide: 'ASYNC_CONFIG',
      useFactory: async () => {
        // 异步操作
        return await getConfigAsync();
      },
    },
    {
      provide: 'ANOTHER_APP_SERVICE',
      useExisting: AppService, // 复用 `AppService` 的现有实现
    },
  ],
})
export class AppModule implements NestModule {
  /*
   * 在模块中使用中间件
   */
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('app');
  }
}

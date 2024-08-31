/*
 * 模块是 NestJS 应用的基本组成部分。
 * 每个应用至少有一个模块，即根模块（AppModule）。
 */
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from '../middleware/logger.middleware';

/*
 * @Module() 装饰器定义了模块，它会将控制器和服务组合起来。
 */
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  /*
   * 在模块中使用中间件
   */
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('app');
  }
}

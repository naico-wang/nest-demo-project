/*
 * 服务通常用于封装业务逻辑，它们可以被多个控制器或其他服务注入。
 */
import { Injectable, Inject } from '@nestjs/common';

/*
 * @Injectable() 装饰器用于标记类为可注入的依赖对象。
 */
@Injectable()
export class AppService {
  constructor(
    @Inject('CONFIG_OPTIONS')
    private config: { apiKey: string; baseUrl: string },
  ) {}

  getConfig() {
    return this.config;
  }
  getHello(): string {
    return 'Hello World!';
  }
}

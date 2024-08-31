/*
 * 服务通常用于封装业务逻辑，它们可以被多个控制器或其他服务注入。
 */
import { Injectable } from '@nestjs/common';

/*
 * @Injectable() 装饰器用于标记类为可注入的依赖对象。
 */
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

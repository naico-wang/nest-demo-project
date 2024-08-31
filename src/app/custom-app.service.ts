/*
 * https://docs.nestjs.com/fundamentals/custom-providers
 * 自定义提供器
 * useValue
 * useClass
 * useFactory
 * useExisting
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomAppService {
  getHello(): string {
    return 'Custom Hello World!';
  }
}

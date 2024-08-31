/*
* 管道用于转换和验证客户端传入的数据。
 */
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value || typeof value !== 'string') {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}

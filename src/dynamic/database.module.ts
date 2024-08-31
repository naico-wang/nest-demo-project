import { DynamicModule, Module } from '@nestjs/common';

@Module({})
export class DatabaseModule {
  static forRoot(options: { type: 'mysql' | 'mongodb' }): DynamicModule {
    const providers = this.createProviders(options.type);

    return {
      module: DatabaseModule,
      providers: providers,
      exports: providers, // 导出提供者
    };
  }

  private static createProviders(type: 'mysql' | 'mongodb') {
    if (type === 'mysql') {
      return [
        {
          provide: 'DATABASE_CONNECTION',
          useValue: 'MySQL Database Connection', // 模拟MySQL连接
        },
      ];
    } else if (type === 'mongodb') {
      return [
        {
          provide: 'DATABASE_CONNECTION',
          useValue: 'MongoDB Database Connection', // 模拟MongoDB连接
        },
      ];
    }
  }
}

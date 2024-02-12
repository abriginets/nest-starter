import { LoggingInterceptor } from '@algoan/nestjs-logging-interceptor';
import { WinstonModule } from 'nest-winston';

import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule as NativeConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { WinstonConfigService } from './winston-config/winston-config.service';

@Module({
  imports: [
    NativeConfigModule.forRoot({
      cache: true,
    }),
    WinstonModule.forRootAsync({
      useClass: WinstonConfigService,
    }),
    CacheModule.register(),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}

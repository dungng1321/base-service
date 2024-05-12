import { AuthModule } from '@components/auth/auth.module';
import { HttpClientModule } from '@core/components/http-client/http-client.module';
import { KongGatewayModule } from '@core/components/kong-gateway/kong-gateway.module';
import { NatsClientModule } from '@core/transporter/nats-transporter/nats-client.module';
import { RabbitMQClientModule } from '@core/transporter/rabbitmq-transporter/rabbitmq-client.module';
import { TcpClientModule } from '@core/transporter/tcp-transporter/tcp-client.module';
import { BootModule } from '@nestcloud/boot';
import { BOOT, CONSUL } from '@nestcloud/common';
import { ConfigModule as ConsulConfigModule } from '@nestcloud/config';
import { ConsulModule } from '@nestcloud/consul';
import { ServiceModule } from '@nestcloud/service';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { I18nJsonLoader, I18nModule } from 'nestjs-i18n';
import * as path from 'path';
import type { ClientOpts } from 'redis';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserRoleModule } from './components/user-role/user-role.module';
import { CoreModule } from './core/core.module';
import { ValidationPipe } from './core/pipe/validation.pipe';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'vi',
      loader: I18nJsonLoader,
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
    }),
    BootModule.forRoot({
      filePath: path.join(__dirname, '../config.yaml'),
    }),
    ConsulModule.forRootAsync({ inject: [BOOT] }),
    ServiceModule.forRootAsync({ inject: [BOOT, CONSUL] }),
    ConsulConfigModule.forRootAsync({ inject: [BOOT, CONSUL] }),
    HttpClientModule,
    KongGatewayModule.forRootAsync(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_POSTGRES_HOST,
      port: parseInt(process.env.DATABASE_POSTGRES_PORT),
      username: process.env.DATABASE_POSTGRES_USERNAME,
      password: process.env.DATABASE_POSTGRES_PASSWORD,
      database: process.env.DATABASE_NAME,
      logging: true,
      entities: [
        path.join(__dirname, '/entities/**/*.entity.{ts,js}'),
        path.join(
          __dirname,
          '/components/**/entities/*.entity.{ts,js}' /* search in components */,
        ),
      ],
      migrations: [path.join(__dirname, '/database/migrations/*.{ts,js}')],
      subscribers: ['dist/observers/subscribers/*.subscriber.{ts,js}'],
      // We are using migrations, synchronize should be set to false.
      synchronize: false,
      // Run migrations automatically,
      // you can disable this if you prefer running migration manually.
      migrationsRun: true,
      extra: {
        max: parseInt(process.env.DATABASE_MAX_POOL) || 20,
      },
      namingStrategy: new SnakeNamingStrategy(),
    }),
    CacheModule.register<ClientOpts>({
      store: redisStore,
      host: process.env.REDIS_CACHE_HOST || 'redis_cache',
      port: parseInt(process.env.REDIS_CACHE_PORT) || 6379,
      ttl: 10,
      isGlobal: true,
    }),
    CoreModule,
    UserRoleModule,
    AuthModule,
    NatsClientModule,
    RabbitMQClientModule,
    TcpClientModule.register('userService'),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    AppService,
  ],
})
export class AppModule {}

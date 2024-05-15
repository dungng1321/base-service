import { NatsConfig } from '@config/nats.config';
import { ExceptionEnterceptor } from '@core/interceptors/exception.interceptor';
import { FilterQueryPipe } from '@core/pipe/filter-query.pipe';
import { SortQueryPipe } from '@core/pipe/sort-query.pipe';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { APIPrefix } from './common/common';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
    {
      logger: ['error', 'warn', 'log', 'debug'],
    },
  );

  let corsOptions = {};
  const configService = new ConfigService();
  if (configService.get('corsOrigin')) {
    corsOptions = {
      origin: new ConfigService().get('corsOrigin'),
    };
  }

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://rabbitmq:5672'],
      exchange: 'amq.topic',
      exchangeType: 'topic',
      routingKey: 'rabbitmq-base.*',
      queue: 'warehouse_service_queue',
      queueOptions: {
        durable: true,
      },
      noAck: false,
    },
  });
  app.connectMicroservice(
    {
      transport: Transport.NATS,
      options: {
        servers: NatsConfig().servers,
        queue: NatsConfig().baseService,
      },
    },
    { inheritAppConfig: true },
  );

  await app.startAllMicroservices();

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  app.register(require('@fastify/cors'), corsOptions);

  app.setGlobalPrefix(APIPrefix.Version);
  const options = new DocumentBuilder()
    .setTitle('API docs')
    .addBearerAuth(
      { type: 'http', description: 'Access token' },
      'access-token',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/v1/bases/swagger-docs', app, document);

  app.useGlobalPipes(new SortQueryPipe());
  app.useGlobalPipes(new FilterQueryPipe());
  app.useGlobalInterceptors(new ExceptionEnterceptor());

  await app.listen(new ConfigService().get('httpPort'), '0.0.0.0');
}

bootstrap();

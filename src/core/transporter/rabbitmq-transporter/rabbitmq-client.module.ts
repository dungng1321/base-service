import { NatsConfig } from '@config/nats.config';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { RabbitMQClientService } from './rabbitmq-client.service';
import { RabbitConfig } from '@config/rabbitmq.config';
@Global()
@Module({
  imports: [ConfigModule.forFeature(RabbitConfig)],
  providers: [
    {
      provide: 'RABBITMQ_CLIENT_SERVICE',
      inject: [RabbitConfig.KEY],
      useFactory: (config: ConfigType<typeof RabbitConfig>) => {
        return ClientProxyFactory.create({
          options: {
            transport: Transport.RMQ,
            urls: config.urls,
            // queue: 'warehouse_service_queue',
            queue: '',
            exchange: config.exchange,
            exchangeType: 'topic',
            routingKey: 'rabbitmq-base.*',
            queueOptions: {
              durable: true,
            },
          },
        });
      },
    },
    RabbitMQClientService,
  ],
  exports: [RabbitMQClientService],
})
export class RabbitMQClientModule {}

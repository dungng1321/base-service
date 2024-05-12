import { registerAs } from '@nestjs/config';
import 'dotenv/config';

export const RabbitConfig = registerAs('rabbitmq', () => ({
  urls: ['amqp://rabbitmq:5672'],
  exchange: 'app_exchange',
}));

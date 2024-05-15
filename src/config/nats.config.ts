import { registerAs } from '@nestjs/config';
import 'dotenv/config';

export const NatsConfig = registerAs('nats', () => ({
  servers: process.env.NATS_SERVERS?.split(',') || ['nats://nats:4222'],
  baseService: process.env.NATS_AUTH_SERVICE || 'base_service',
}));

export const NATS_USER = process.env.NATS_USER_SERVICE || 'user_service';
export const NATS_AUTH = process.env.NATS_AUTH_SERVICE || 'auth_service';
export const NATS_WAREHOUSE =
  process.env.NATS_WAREHOUSE_SERVICE || 'warehouse_service';

export const NATS_PRODUCE =
  process.env.NATS_PRODUCE_SERVICE || 'produce_service';

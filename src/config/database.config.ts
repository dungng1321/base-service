// import { isDevMode } from '@utils/helper';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config();

const ormConfig = {
  type: 'postgres',
  host: process.env.DATABASE_POSTGRES_HOST,
  port: parseInt(process.env.DATABASE_POSTGRES_PORT),
  maxPool: parseInt(process.env.DATABASE_MAX_POOL) || 20,
  username: process.env.DATABASE_POSTGRES_USERNAME,
  password: process.env.DATABASE_POSTGRES_PASSWORD,
  database: process.env.DATABASE_NAME,
  // logging: isDevMode(),
  logging: process.env.NODE_ENV === 'development',
};

const connectionOptions = new DataSource({
  type: 'postgres',
  host: ormConfig.host,
  port: ormConfig.port,
  username: ormConfig.username,
  password: ormConfig.password,
  database: ormConfig.database,
  entities: ['dist/entities/**/*.entity.{ts,js}', 'src/entities/*.{ts,js}'],
  migrations: ['dist/database/migrations/*.{ts,js}'],
  subscribers: ['dist/observers/subscribers/*.subscriber.{ts,js}'],
  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: false,
  logging: ormConfig.logging,
  extra: {
    maxPool: ormConfig.maxPool,
  },
  namingStrategy: new SnakeNamingStrategy(),
});

connectionOptions.initialize();

export default connectionOptions;

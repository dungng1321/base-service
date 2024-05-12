import { GlobalConfig } from '@config/config.service';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { TcpClientService } from './tcp-client.service';

@Module({})
export class TcpClientModule {
  static register(serviceName: string): DynamicModule {
    return {
      module: TcpClientModule,
      imports: [ConfigModule.forFeature(GlobalConfig)],
      providers: [
        {
          provide: 'TCP_CLIENT_SERVICE',
          inject: [GlobalConfig.KEY],
          useFactory: (globalConfig: ConfigType<typeof GlobalConfig>) => {
            return ClientProxyFactory.create({
              transport: Transport.TCP,
              options: {
                port: globalConfig.tcpServers[serviceName].port,
                host: globalConfig.tcpServers[serviceName].host,
              },
            });
          },
        },
        TcpClientService,
      ],
      exports: [TcpClientService],
    };
  }
}

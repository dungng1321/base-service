import { Inject, Injectable, Scope } from '@nestjs/common';
import type { ClientProxy, ClientRMQ } from '@nestjs/microservices';

import { firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable()
export class RabbitMQClientService {
  constructor(
    @Inject('RABBITMQ_CLIENT_SERVICE') private readonly client: ClientProxy,
  ) {}

  public async send<T>(pattern: string, data: T): Promise<T> {
    return firstValueFrom<T>(this.client.send(pattern, data));
  }

  public async emit<T>(pattern: string, data: T): Promise<any> {
    return await lastValueFrom(this.client.emit(pattern, data));
  }
}

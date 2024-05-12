import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { TransporterClientInterface } from './transporter.client.interface';

export class TransporterClientService implements TransporterClientInterface {
  private client: ClientProxy;

  constructor(client: ClientProxy) {
    this.client = client;
  }

  async send(pattern: string, data: any): Promise<any> {
    const request = this.client.send(pattern, data);
    return await firstValueFrom(request);
  }
}

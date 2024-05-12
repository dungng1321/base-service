import { Inject, Injectable } from '@nestjs/common';
import { ClientNats } from '@nestjs/microservices';
import { TransporterClientInterface } from '../transporter.client.interface';
import { TransporterClientService } from '../transporter.client.service';

@Injectable()
export class NatsClientService
  extends TransporterClientService
  implements TransporterClientInterface
{
  constructor(
    @Inject('NATS_CLIENT_SERVICE') private readonly natsClient: ClientNats,
  ) {
    super(natsClient);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { TransporterClientInterface } from '../transporter.client.interface';
import { TransporterClientService } from '../transporter.client.service';

@Injectable()
export class TcpClientService
  extends TransporterClientService
  implements TransporterClientInterface
{
  constructor(
    @Inject('TCP_CLIENT_SERVICE') private readonly tcpClient: ClientProxy,
  ) {
    super(tcpClient);
  }
}

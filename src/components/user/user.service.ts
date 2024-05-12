import { NATS_USER } from '@config/nats.config';
import { NatsClientService } from '@core/transporter/nats-transporter/nats-client.service';
import { Injectable } from '@nestjs/common';
import { UserServiceInterface } from './interface/user.service.interface';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(private readonly natsClientService: NatsClientService) {}

  async getDetail(id: any): Promise<any> {
    const response = await this.natsClientService.send(`${NATS_USER}.detail`, {
      id,
    });
    return response?.data;
  }
}

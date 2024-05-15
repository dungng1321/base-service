import { ResponseCodeEnum } from '@constant/response-code.enum';
import { RabbitMQClientService } from '@core/transporter/rabbitmq-transporter/rabbitmq-client.service';
import { InjectConfig } from '@nestcloud/config';
import { Inject, Injectable } from '@nestjs/common';
import type { ClientProxy } from '@nestjs/microservices';
import { ResponseBuilder } from '@utils/response-builder';

@Injectable()
export class AppService {
  constructor(
    @InjectConfig()
    private readonly config: any,
    private readonly rabbitMQClientService: RabbitMQClientService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  getHealth(): any {
    return new ResponseBuilder()
      .withCode(ResponseCodeEnum.SUCCESS)
      .withMessage('This is rabbitmq-base')
      .build();
  }

  async testNE(): Promise<any> {
    const data = {
      name: 'test',
      age: 20,
    };
    console.log('data', data);
    const result = await this.rabbitMQClientService.send(
      'rabbitmq-base.test',
      data,
    );
    console.log('result', result);
    return new ResponseBuilder()
      .withCode(ResponseCodeEnum.SUCCESS)
      .withData('Thanh cong')
      .build();
  }
}

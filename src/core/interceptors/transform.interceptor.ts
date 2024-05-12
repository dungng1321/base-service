import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponsePayload } from 'src/utils/response-payload';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ResponsePayload<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponsePayload<T>> {
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((data) => {
        if (response.status && data?.statusCode) {
          response.status(data.statusCode);
        }
        return {
          statusCode: data?.statusCode,
          message: data?.message,
          data: data?.data,
        };
      }),
    );
  }
}
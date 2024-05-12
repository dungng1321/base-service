// import { config } from '@config/app';
import { getMessage, ResponseCodeEnum } from '@constant/response-code.enum';
import { ExceptionEnterceptor } from '@core/interceptors/exception.interceptor';
import { HttpException } from '@nestjs/common';
import { ResponseBuilder } from '@utils/response-builder';
import { ResponsePayload } from '@utils/response-payload';

export class ApiError extends Error {
  private readonly _errorCode: ResponseCodeEnum;

  private readonly _message: string;

  private readonly _errors: any;

  // private _debug: unknown;

  constructor(errorCode: ResponseCodeEnum, message?: string, errors?: any) {
    super(message);

    this._errorCode = errorCode;
    this._message = message;
    this._errors = errors;
  }

  get errorCode(): ResponseCodeEnum {
    return this._errorCode;
  }

  get message(): string {
    return this._message || getMessage(this._errorCode);
  }

  // debug(data: unknown): ApiError {
  //   if (config.environment == 'development') {
  //     this._debug = data;
  //   }

  //   return this;
  // }

  toResponse(): ResponsePayload<unknown> {
    // return new ResponseBuilder<unknown>()
    //   .withCode(this._errorCode)
    //   .withMessage(this.message)
    //   .build();
    const dataException = {
      statusCode: this._errorCode,
      message: this.message,
      errors: this._errors,
    };

    // Remove keys null or undefined
    const response = Object.fromEntries(
      Object.entries(dataException).filter(
        ([_, value]) => value !== null || value !== undefined,
      ),
    );
    throw new HttpException(response, this._errorCode);
  }
}

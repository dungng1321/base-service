import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { BaseDto } from '@core/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { RememberPassword } from '@utils/common';

export class LoginRequestDto extends BaseDto {
  @ApiProperty({ example: 'admin' })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'snp1234567' })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  password: string;
}

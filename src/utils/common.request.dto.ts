import { BaseDto } from '@core/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteRequestDto extends BaseDto {
  @ApiProperty({ example: 1, description: 'Mã id' })
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

export class DetailRequestDto extends BaseDto {
  @ApiProperty({ example: 1, description: 'Mã id' })
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

export class UpdateRequestDto extends BaseDto {
  @ApiProperty({ example: 1, description: 'Mã id' })
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

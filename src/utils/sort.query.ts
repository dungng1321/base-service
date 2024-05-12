import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationQuery } from './pagination.query';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { EnumSort } from './common';

export class SortQuery extends PaginationQuery {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  orderBy: string;

  @ApiPropertyOptional()
  @IsEnum(EnumSort)
  @IsOptional()
  orderValue: EnumSort;
}

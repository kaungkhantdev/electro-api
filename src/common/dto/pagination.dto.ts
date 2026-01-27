import {
  IsOptional,
  IsInt,
  Min,
  Max,
  // IsUUID
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

// For offset pagination (page/limit)
export class OffsetPaginationDto {
  @ApiPropertyOptional({ example: 1, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ example: 10, default: 10, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;
}

// For cursor pagination (cursor/limit)
export class CursorPaginationDto {
  @ApiPropertyOptional({ example: 10, default: 10, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @ApiPropertyOptional({ description: 'Product ID to start after' })
  @IsOptional()
  // @IsUUID()
  cursor?: string;
}

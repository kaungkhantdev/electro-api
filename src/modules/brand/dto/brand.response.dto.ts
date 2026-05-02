import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class BrandResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  logo: string;
}

export class PaginatedBrandsResponseDto {
  @ApiProperty({ type: [BrandResponseDto] })
  items: BrandResponseDto[];

  @ApiProperty({ example: 20 })
  limit: number;

  @ApiProperty({ example: 'clx123abc', nullable: true })
  nextCursor: string | null;

  @ApiProperty({ example: true })
  hasNextPage: boolean;
}

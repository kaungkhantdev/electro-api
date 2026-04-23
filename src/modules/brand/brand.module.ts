import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandRepository } from './repositories/brand.repository';
import { BRAND_REPOSITORY } from './repositories/interface/brand.repository.interface';
import { AdminBrandController } from './admin.brand.controller';

@Module({
  controllers: [AdminBrandController],
  providers: [
    BrandService,
    {
      provide: BRAND_REPOSITORY,
      useClass: BrandRepository,
    },
  ],
})
export class BrandModule {}

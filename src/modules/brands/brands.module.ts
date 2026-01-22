import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { BRANDS_REPOSITORY } from './repositories/brands.repository.interface';
import { BrandsRepository } from './repositories/brands.repository';

@Module({
  controllers: [BrandsController],
  providers: [
    BrandsService,
    {
      provide: BRANDS_REPOSITORY,
      useClass: BrandsRepository,
    },
  ],
})
export class BrandsModule {}

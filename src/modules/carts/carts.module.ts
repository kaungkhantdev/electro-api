import { Module } from '@nestjs/common';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { CART_REPOSITORY } from './repositories/interfaces/carts.repository.interface';
import { WISHLIST_REPOSITORY } from './repositories/interfaces/wishlists.repository.interface';
import { CartsRepository } from './repositories/carts.repository';
import { WishlistsRepository } from './repositories/wishlists.repository';

@Module({
  imports: [],
  controllers: [CartsController],
  providers: [
    CartsService,
    { provide: CART_REPOSITORY, useClass: CartsRepository },
    { provide: WISHLIST_REPOSITORY, useClass: WishlistsRepository },
  ],
  exports: [],
})
export class CartsModule {}

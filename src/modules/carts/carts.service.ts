import { Inject, Injectable } from '@nestjs/common';
import { ICartRepository } from './repositories/interfaces/carts.repository.interface';
import { IWishlistRepository } from './repositories/interfaces/wishlists.repository.interface';
import { CART_REPOSITORY } from './repositories/interfaces/carts.repository.interface';
import { WISHLIST_REPOSITORY } from './repositories/interfaces/wishlists.repository.interface';
import {
  AddProductToCartDto,
  AddProductToWishlistDto,
  RemoveProductFromCartDto,
  RemoveProductFromWishlistDto,
} from './dto/carts.dto';

@Injectable()
export class CartsService {
  constructor(
    @Inject(CART_REPOSITORY)
    private readonly cartRepository: ICartRepository,
    @Inject(WISHLIST_REPOSITORY)
    private readonly wishlistRepository: IWishlistRepository,
  ) {}

  async addProductToCart(data: AddProductToCartDto) {
    return await this.cartRepository.create({
      data: {
        userId: data.userId,
        productId: data.productId,
        quantity: data.quantity,
      },
    });
  }

  async addProductToWishlist(data: AddProductToWishlistDto) {
    return await this.wishlistRepository.create({
      data: {
        userId: data.userId,
        productId: data.productId,
      },
    });
  }

  async removeProductFromCart(data: RemoveProductFromCartDto) {
    return await this.cartRepository.delete(data.userId);
  }

  async removeProductFromWishlist(data: RemoveProductFromWishlistDto) {
    return await this.wishlistRepository.delete(data.userId);
  }

  async getCart(userId: string) {
    return await this.cartRepository.findByUserId(userId);
  }

  async getWishlist(userId: string) {
    return await this.wishlistRepository.findByUserId(userId);
  }
}

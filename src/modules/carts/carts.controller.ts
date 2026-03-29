import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CartsService } from './carts.service';
import {
  AddProductToCartDto,
  AddProductToWishlistDto,
  RemoveProductFromCartDto,
  RemoveProductFromWishlistDto,
} from './dto/carts.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  @ApiOperation({
    summary: 'Add product to cart',
    description: 'Adds a product to the cart.',
  })
  @ApiResponse({
    status: 200,
    description: 'Product added to cart successfully',
  })
  async addProductToCart(@Body() body: AddProductToCartDto) {
    return await this.cartsService.addProductToCart(body);
  }

  @Post('wishlist')
  @ApiOperation({
    summary: 'Add product to wishlist',
    description: 'Adds a product to the wishlist.',
  })
  @ApiResponse({
    status: 200,
    description: 'Product added to wishlist successfully',
  })
  async addProductToWishlist(@Body() body: AddProductToWishlistDto) {
    return await this.cartsService.addProductToWishlist(body);
  }

  @Delete('cart')
  @ApiOperation({
    summary: 'Remove product from cart',
    description: 'Removes a product from the cart.',
  })
  @ApiResponse({
    status: 200,
    description: 'Product removed from cart successfully',
  })
  async removeProductFromCart(@Body() body: RemoveProductFromCartDto) {
    return await this.cartsService.removeProductFromCart(body);
  }

  @Delete('wishlist')
  @ApiOperation({
    summary: 'Remove product from wishlist',
    description: 'Removes a product from the wishlist.',
  })
  @ApiResponse({
    status: 200,
    description: 'Product removed from wishlist successfully',
  })
  async removeProductFromWishlist(@Body() body: RemoveProductFromWishlistDto) {
    return await this.cartsService.removeProductFromWishlist(body);
  }

  @Get('cart')
  @ApiOperation({
    summary: 'Get cart',
    description: 'Returns the cart.',
  })
  @ApiResponse({
    status: 200,
    description: 'Cart retrieved successfully',
  })
  async getCart(@Body() body: { userId: string }) {
    return await this.cartsService.getCart(body.userId);
  }

  @Get('wishlist')
  @ApiOperation({
    summary: 'Get wishlist',
    description: 'Returns the wishlist.',
  })
  @ApiResponse({
    status: 200,
    description: 'Wishlist retrieved successfully',
  })
  async getWishlist(@Body() body: { userId: string }) {
    return await this.cartsService.getWishlist(body.userId);
  }
}

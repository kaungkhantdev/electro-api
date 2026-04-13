import { Test, TestingModule } from '@nestjs/testing';
import { CartsService } from './carts.service';
import { CART_REPOSITORY } from './repositories/interfaces/carts.repository.interface';
import { WISHLIST_REPOSITORY } from './repositories/interfaces/wishlists.repository.interface';

const mockCartItem = {
  id: 'cart-item-1',
  userId: 'user-123',
  productId: 'product-1',
  quantity: 2,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

const mockWishlistItem = {
  id: 'wishlist-item-1',
  userId: 'user-123',
  productId: 'product-1',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

describe('CartsService', () => {
  let service: CartsService;
  let cartRepository: {
    create: jest.Mock;
    delete: jest.Mock;
    findByUserId: jest.Mock;
  };
  let wishlistRepository: {
    create: jest.Mock;
    delete: jest.Mock;
    findByUserId: jest.Mock;
  };

  beforeEach(async () => {
    cartRepository = {
      create: jest.fn(),
      delete: jest.fn(),
      findByUserId: jest.fn(),
    };

    wishlistRepository = {
      create: jest.fn(),
      delete: jest.fn(),
      findByUserId: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartsService,
        { provide: CART_REPOSITORY, useValue: cartRepository },
        { provide: WISHLIST_REPOSITORY, useValue: wishlistRepository },
      ],
    }).compile();

    service = module.get<CartsService>(CartsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addProductToCart', () => {
    it('should create a cart item with userId, productId, and quantity', async () => {
      const dto = { userId: 'user-123', productId: 'product-1', quantity: 2 };
      cartRepository.create.mockResolvedValue(mockCartItem);

      const result = await service.addProductToCart(dto);

      expect(cartRepository.create).toHaveBeenCalledWith({
        data: { userId: 'user-123', productId: 'product-1', quantity: 2 },
      });
      expect(result).toEqual(mockCartItem);
    });
  });

  describe('addProductToWishlist', () => {
    it('should create a wishlist item with userId and productId', async () => {
      const dto = { userId: 'user-123', productId: 'product-1' };
      wishlistRepository.create.mockResolvedValue(mockWishlistItem);

      const result = await service.addProductToWishlist(dto);

      expect(wishlistRepository.create).toHaveBeenCalledWith({
        data: { userId: 'user-123', productId: 'product-1' },
      });
      expect(result).toEqual(mockWishlistItem);
    });
  });

  describe('removeProductFromCart', () => {
    it('should call cartRepository.delete with userId', async () => {
      const dto = { userId: 'user-123', productId: 'product-1' };
      cartRepository.delete.mockResolvedValue(mockCartItem);

      const result = await service.removeProductFromCart(dto);

      expect(cartRepository.delete).toHaveBeenCalledWith('user-123');
      expect(result).toEqual(mockCartItem);
    });
  });

  describe('removeProductFromWishlist', () => {
    it('should call wishlistRepository.delete with userId', async () => {
      const dto = { userId: 'user-123', productId: 'product-1' };
      wishlistRepository.delete.mockResolvedValue(mockWishlistItem);

      const result = await service.removeProductFromWishlist(dto);

      expect(wishlistRepository.delete).toHaveBeenCalledWith('user-123');
      expect(result).toEqual(mockWishlistItem);
    });
  });

  describe('getCart', () => {
    it('should return cart items for a user', async () => {
      cartRepository.findByUserId.mockResolvedValue([mockCartItem]);

      const result = await service.getCart('user-123');

      expect(cartRepository.findByUserId).toHaveBeenCalledWith('user-123');
      expect(result).toEqual([mockCartItem]);
    });
  });

  describe('getWishlist', () => {
    it('should return wishlist items for a user', async () => {
      wishlistRepository.findByUserId.mockResolvedValue([mockWishlistItem]);

      const result = await service.getWishlist('user-123');

      expect(wishlistRepository.findByUserId).toHaveBeenCalledWith('user-123');
      expect(result).toEqual([mockWishlistItem]);
    });
  });
});

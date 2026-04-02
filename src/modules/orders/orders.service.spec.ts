import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { ORDERS_REPOSITORY } from './repositories/orders.repository.interface';
import { ORDER_ITEMS_REPOSITORY } from './repositories/order-items.repository.interface';

const mockOrder = {
  id: 'order-1',
  userId: 'user-123',
  status: 'PENDING',
  totalAmount: 100,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

const mockOrderItem = {
  id: 'order-item-1',
  orderId: 'order-1',
  productId: 'product-1',
  quantity: 2,
  price: 50,
};

describe('OrdersService', () => {
  let service: OrdersService;
  let ordersRepository: {
    transaction: jest.Mock;
    createOrder: jest.Mock;
    updateOrder: jest.Mock;
    delete: jest.Mock;
    findAll: jest.Mock;
    findById: jest.Mock;
  };
  let orderItemsRepository: {
    create: jest.Mock;
    deleteMany: jest.Mock;
  };

  beforeEach(async () => {
    ordersRepository = {
      transaction: jest.fn((fn) => fn()),
      createOrder: jest.fn(),
      updateOrder: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
    };

    orderItemsRepository = {
      create: jest.fn(),
      deleteMany: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: ORDERS_REPOSITORY, useValue: ordersRepository },
        { provide: ORDER_ITEMS_REPOSITORY, useValue: orderItemsRepository },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createOrder', () => {
    it('should create order and its items within a transaction', async () => {
      const dto = {
        userId: 'user-123',
        status: 'PENDING',
        totalAmount: 100,
        orderItems: { productId: 'product-1', quantity: 2, price: 50 },
      } as any;
      ordersRepository.createOrder.mockResolvedValue(mockOrder);
      orderItemsRepository.create.mockResolvedValue(mockOrderItem);

      const result = await service.createOrder(dto);

      expect(ordersRepository.transaction).toHaveBeenCalled();
      expect(ordersRepository.createOrder).toHaveBeenCalledWith(dto);
      expect(orderItemsRepository.create).toHaveBeenCalledWith({
        ...dto.orderItems,
        orderId: mockOrder.id,
      });
      expect(result).toEqual(mockOrder);
    });
  });

  describe('updateOrder', () => {
    it('should update order, delete old items, and create new items within a transaction', async () => {
      const dto = {
        status: 'PROCESSING',
        orderItems: { productId: 'product-2', quantity: 1, price: 100 },
      } as any;
      ordersRepository.updateOrder.mockResolvedValue({
        ...mockOrder,
        status: 'PROCESSING',
      });
      orderItemsRepository.deleteMany.mockResolvedValue({ count: 1 });
      orderItemsRepository.create.mockResolvedValue(mockOrderItem);

      const result = await service.updateOrder('order-1', dto);

      expect(ordersRepository.transaction).toHaveBeenCalled();
      expect(ordersRepository.updateOrder).toHaveBeenCalledWith('order-1', dto);
      expect(orderItemsRepository.deleteMany).toHaveBeenCalledWith({
        orderId: 'order-1',
      });
      expect(orderItemsRepository.create).toHaveBeenCalledWith({
        ...dto.orderItems,
        orderId: mockOrder.id,
      });
      expect(result).toMatchObject({ status: 'PROCESSING' });
    });
  });

  describe('deleteOrder', () => {
    it('should delete order items then the order within a transaction', async () => {
      orderItemsRepository.deleteMany.mockResolvedValue({ count: 1 });
      ordersRepository.delete.mockResolvedValue(mockOrder);

      const result = await service.deleteOrder('order-1');

      expect(ordersRepository.transaction).toHaveBeenCalled();
      expect(orderItemsRepository.deleteMany).toHaveBeenCalledWith({
        orderId: 'order-1',
      });
      expect(ordersRepository.delete).toHaveBeenCalledWith('order-1');
      expect(result).toEqual(mockOrder);
    });
  });

  describe('getAll', () => {
    it('should return paginated orders without cursor', async () => {
      const rows = [mockOrder, { ...mockOrder, id: 'order-2' }];
      ordersRepository.findAll.mockResolvedValue(rows);

      const result = await service.getAll(undefined, 10);

      expect(ordersRepository.findAll).toHaveBeenCalledWith({ take: 11 });
      expect(result.limit).toBe(10);
      expect(result.hasNextPage).toBe(false);
      expect(result.nextCursor).toBeNull();
    });

    it('should use cursor when provided', async () => {
      ordersRepository.findAll.mockResolvedValue([mockOrder]);

      await service.getAll('cursor-abc', 10);

      expect(ordersRepository.findAll).toHaveBeenCalledWith({
        take: 11,
        skip: 1,
        cursor: { id: 'cursor-abc' },
      });
    });

    it('should set hasNextPage and nextCursor when more items exist', async () => {
      const rows = Array.from({ length: 11 }, (_, i) => ({
        ...mockOrder,
        id: `order-${i}`,
      }));
      ordersRepository.findAll.mockResolvedValue(rows);

      const result = await service.getAll(undefined, 10);

      expect(result.hasNextPage).toBe(true);
      expect(result.nextCursor).toBe('order-9');
      expect(result.items).toHaveLength(10);
    });
  });

  describe('getById', () => {
    it('should fetch and return a single order', async () => {
      ordersRepository.findById.mockResolvedValue(mockOrder);

      await service.getById('order-1');

      expect(ordersRepository.findById).toHaveBeenCalledWith('order-1');
    });
  });
});

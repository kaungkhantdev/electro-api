import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService } from './payments.service';
import { PAYMENTS_REPOSITORY } from './repositories/payments.repository';
import { PAYMENT_METHODS_REPOSITORY } from './repositories/interfaces/payment-methods.repository.interface';
import { PAYMENT_AUDIT_LOGS_REPOSITORY } from './repositories/interfaces/payment-audit-logs.repository.interface';

const mockPayment = {
  id: 'payment-1',
  orderId: 'order-1',
  amount: 100,
  currency: 'USD',
  status: 'PENDING',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

const mockPaymentMethod = {
  id: 'pm-1',
  userId: 'user-123',
  type: 'CREDIT_CARD',
  details: {},
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

const mockAuditLog = {
  id: 'log-1',
  paymentId: 'payment-1',
  event: 'CREATED',
  createdAt: new Date('2024-01-01'),
};

describe('PaymentsService', () => {
  let service: PaymentsService;
  let paymentsRepository: {
    createPayment: jest.Mock;
    findAll: jest.Mock;
    findById: jest.Mock;
    update: jest.Mock;
  };
  let paymentMethodsRepository: {
    createPaymentMethod: jest.Mock;
    findAll: jest.Mock;
    findById: jest.Mock;
    update: jest.Mock;
  };
  let paymentAuditLogsRepository: {
    createPaymentAuditLog: jest.Mock;
    findAll: jest.Mock;
    findById: jest.Mock;
  };

  beforeEach(async () => {
    paymentsRepository = {
      createPayment: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
    };

    paymentMethodsRepository = {
      createPaymentMethod: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
    };

    paymentAuditLogsRepository = {
      createPaymentAuditLog: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsService,
        { provide: PAYMENTS_REPOSITORY, useValue: paymentsRepository },
        {
          provide: PAYMENT_METHODS_REPOSITORY,
          useValue: paymentMethodsRepository,
        },
        {
          provide: PAYMENT_AUDIT_LOGS_REPOSITORY,
          useValue: paymentAuditLogsRepository,
        },
      ],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createPayment', () => {
    it('should call createPayment on the repository', async () => {
      const dto = { orderId: 'order-1', amount: 100, currency: 'USD' } as any;
      paymentsRepository.createPayment.mockResolvedValue(mockPayment);

      await service.createPayment(dto);

      expect(paymentsRepository.createPayment).toHaveBeenCalledWith(dto);
    });
  });

  describe('createPaymentMethod', () => {
    it('should call createPaymentMethod on the repository', async () => {
      const dto = { userId: 'user-123', type: 'CREDIT_CARD' } as any;
      paymentMethodsRepository.createPaymentMethod.mockResolvedValue(
        mockPaymentMethod,
      );

      await service.createPaymentMethod(dto);

      expect(paymentMethodsRepository.createPaymentMethod).toHaveBeenCalledWith(
        dto,
      );
    });
  });

  describe('createPaymentAuditLog', () => {
    it('should call createPaymentAuditLog on the repository', async () => {
      const dto = { paymentId: 'payment-1', event: 'CREATED' } as any;
      paymentAuditLogsRepository.createPaymentAuditLog.mockResolvedValue(
        mockAuditLog,
      );

      await service.createPaymentAuditLog(dto);

      expect(
        paymentAuditLogsRepository.createPaymentAuditLog,
      ).toHaveBeenCalledWith(dto);
    });
  });

  describe('getAllPayments', () => {
    it('should return paginated payments without cursor', async () => {
      paymentsRepository.findAll.mockResolvedValue([mockPayment]);

      const result = await service.getAllPayments(undefined, 10);

      expect(paymentsRepository.findAll).toHaveBeenCalledWith({ take: 11 });
      expect(result.limit).toBe(10);
      expect(result.hasNextPage).toBe(false);
      expect(result.nextCursor).toBeNull();
    });

    it('should use cursor when provided', async () => {
      paymentsRepository.findAll.mockResolvedValue([mockPayment]);

      await service.getAllPayments('cursor-xyz', 10);

      expect(paymentsRepository.findAll).toHaveBeenCalledWith({
        take: 11,
        skip: 1,
        cursor: { id: 'cursor-xyz' },
      });
    });

    it('should set hasNextPage and nextCursor when more items exist', async () => {
      const rows = Array.from({ length: 11 }, (_, i) => ({
        ...mockPayment,
        id: `payment-${i}`,
      }));
      paymentsRepository.findAll.mockResolvedValue(rows);

      const result = await service.getAllPayments(undefined, 10);

      expect(result.hasNextPage).toBe(true);
      expect(result.nextCursor).toBe('payment-9');
      expect(result.items).toHaveLength(10);
    });
  });

  describe('getAllPaymentMethods', () => {
    it('should return paginated payment methods', async () => {
      paymentMethodsRepository.findAll.mockResolvedValue([mockPaymentMethod]);

      const result = await service.getAllPaymentMethods(undefined, 5);

      expect(paymentMethodsRepository.findAll).toHaveBeenCalledWith({
        take: 6,
      });
      expect(result.hasNextPage).toBe(false);
    });
  });

  describe('getAllPaymentAuditLogs', () => {
    it('should return paginated audit logs', async () => {
      paymentAuditLogsRepository.findAll.mockResolvedValue([mockAuditLog]);

      const result = await service.getAllPaymentAuditLogs(undefined, 5);

      expect(paymentAuditLogsRepository.findAll).toHaveBeenCalledWith({
        take: 6,
      });
      expect(result.hasNextPage).toBe(false);
    });
  });

  describe('getPaymentById', () => {
    it('should fetch payment by id', async () => {
      paymentsRepository.findById.mockResolvedValue(mockPayment);

      await service.getPaymentById('payment-1');

      expect(paymentsRepository.findById).toHaveBeenCalledWith('payment-1');
    });
  });

  describe('getPaymentMethodById', () => {
    it('should fetch payment method by id', async () => {
      paymentMethodsRepository.findById.mockResolvedValue(mockPaymentMethod);

      await service.getPaymentMethodById('pm-1');

      expect(paymentMethodsRepository.findById).toHaveBeenCalledWith('pm-1');
    });
  });

  describe('getPaymentAuditLogById', () => {
    it('should fetch audit log by id', async () => {
      paymentAuditLogsRepository.findById.mockResolvedValue(mockAuditLog);

      await service.getPaymentAuditLogById('log-1');

      expect(paymentAuditLogsRepository.findById).toHaveBeenCalledWith('log-1');
    });
  });

  describe('updatePayment', () => {
    it('should update payment and return mapped dto', async () => {
      const dto = { status: 'COMPLETED' } as any;
      paymentsRepository.update.mockResolvedValue({
        ...mockPayment,
        status: 'COMPLETED',
      });

      await service.updatePayment('payment-1', dto);

      expect(paymentsRepository.update).toHaveBeenCalledWith('payment-1', dto);
    });
  });

  describe('updatePaymentMethod', () => {
    it('should update payment method and return mapped dto', async () => {
      const dto = { type: 'BANK_TRANSFER' } as any;
      paymentMethodsRepository.update.mockResolvedValue({
        ...mockPaymentMethod,
        type: 'BANK_TRANSFER',
      });

      await service.updatePaymentMethod('pm-1', dto);

      expect(paymentMethodsRepository.update).toHaveBeenCalledWith('pm-1', dto);
    });
  });
});

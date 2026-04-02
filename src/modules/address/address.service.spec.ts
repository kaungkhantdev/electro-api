import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { AddressService } from './address.service';
import { ADDRESS_REPOSITORY } from './repositories/address.repository.interface';

const mockAddress = {
  id: 'address-1',
  userId: 'user-123',
  firstName: 'John',
  lastName: 'Doe',
  company: 'Acme',
  address1: '123 Main St',
  address2: '',
  city: 'Springfield',
  state: 'IL',
  zipCode: '62701',
  country: 'US',
  phone: '555-0100',
  isDefault: false,
  type: 'SHIPPING',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

describe('AddressService', () => {
  let service: AddressService;
  let addressRepository: {
    createAddress: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
    findById: jest.Mock;
    findAll: jest.Mock;
  };

  beforeEach(async () => {
    addressRepository = {
      createAddress: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        { provide: ADDRESS_REPOSITORY, useValue: addressRepository },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createAddress', () => {
    it('should delegate to addressRepository.createAddress', async () => {
      const dto = {
        userId: 'user-123',
        address1: '123 Main St',
        city: 'Springfield',
        country: 'US',
      } as any;
      addressRepository.createAddress.mockResolvedValue(mockAddress);

      const result = await service.createAddress(dto);

      expect(addressRepository.createAddress).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockAddress);
    });
  });

  describe('updateAddress', () => {
    it('should delegate to addressRepository.update', async () => {
      const dto = { city: 'Chicago' } as any;
      addressRepository.update.mockResolvedValue({
        ...mockAddress,
        city: 'Chicago',
      });

      const result = await service.updateAddress('address-1', dto);

      expect(addressRepository.update).toHaveBeenCalledWith('address-1', dto);
      expect(result).toMatchObject({ city: 'Chicago' });
    });
  });

  describe('deleteAddress', () => {
    it('should delegate to addressRepository.delete', async () => {
      addressRepository.delete.mockResolvedValue(mockAddress);

      const result = await service.deleteAddress('address-1');

      expect(addressRepository.delete).toHaveBeenCalledWith('address-1');
      expect(result).toEqual(mockAddress);
    });
  });

  describe('getAddress', () => {
    it('should return address when found', async () => {
      addressRepository.findById.mockResolvedValue(mockAddress);

      const result = await service.getAddress('address-1');

      expect(addressRepository.findById).toHaveBeenCalledWith('address-1');
      expect(result).toEqual(mockAddress);
    });

    it('should throw NotFoundException when address not found', async () => {
      addressRepository.findById.mockResolvedValue(null);

      await expect(service.getAddress('nonexistent')).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.getAddress('nonexistent')).rejects.toThrow(
        'Address not found',
      );
    });
  });

  describe('getAll', () => {
    it('should return paginated result without cursor', async () => {
      const rows = [mockAddress, { ...mockAddress, id: 'address-2' }];
      addressRepository.findAll.mockResolvedValue(rows);

      const result = await service.getAll(undefined, 10);

      expect(addressRepository.findAll).toHaveBeenCalledWith({ take: 11 });
      expect(result.limit).toBe(10);
      expect(result.hasNextPage).toBe(false);
      expect(result.nextCursor).toBeNull();
      expect(result.items).toHaveLength(2);
    });

    it('should use cursor when provided', async () => {
      addressRepository.findAll.mockResolvedValue([mockAddress]);

      await service.getAll('cursor-abc', 10);

      expect(addressRepository.findAll).toHaveBeenCalledWith({
        take: 11,
        skip: 1,
        cursor: { id: 'cursor-abc' },
      });
    });

    it('should set hasNextPage and nextCursor when more items exist', async () => {
      const rows = Array.from({ length: 11 }, (_, i) => ({
        ...mockAddress,
        id: `address-${i}`,
      }));
      addressRepository.findAll.mockResolvedValue(rows);

      const result = await service.getAll(undefined, 10);

      expect(result.hasNextPage).toBe(true);
      expect(result.nextCursor).toBe('address-9');
      expect(result.items).toHaveLength(10);
    });
  });
});

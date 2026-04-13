import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';
import { USER_REPOSITORY } from './repositories/users.repository.interface';
import {
  mockUser,
  mockUsers,
  createMockUser,
} from '../../../test/fixtures/users.fixture';
import { UserRole } from 'generated/prisma/enums';

jest.mock('bcrypt');

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: {
    findByEmail: jest.Mock;
    findById: jest.Mock;
    findByUsername: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
    findAll: jest.Mock;
  };

  beforeEach(async () => {
    usersRepository = {
      findByEmail: jest.fn(),
      findById: jest.fn(),
      findByUsername: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: USER_REPOSITORY, useValue: usersRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserByEmail', () => {
    it('should delegate to usersRepository.findByEmail', async () => {
      usersRepository.findByEmail.mockResolvedValue(mockUser);

      const result = await service.getUserByEmail('test@example.com');

      expect(usersRepository.findByEmail).toHaveBeenCalledWith(
        'test@example.com',
      );
      expect(result).toEqual(mockUser);
    });

    it('should return null when user not found', async () => {
      usersRepository.findByEmail.mockResolvedValue(null);

      const result = await service.getUserByEmail('nobody@example.com');

      expect(result).toBeNull();
    });
  });

  describe('getFindById', () => {
    it('should delegate to usersRepository.findById', async () => {
      usersRepository.findById.mockResolvedValue(mockUser);

      const result = await service.getFindById('user-123');

      expect(usersRepository.findById).toHaveBeenCalledWith('user-123');
      expect(result).toEqual(mockUser);
    });
  });

  describe('getUserByUsername', () => {
    it('should delegate to usersRepository.findByUsername', async () => {
      usersRepository.findByUsername.mockResolvedValue(mockUser);

      const result = await service.getUserByUsername('testuser');

      expect(usersRepository.findByUsername).toHaveBeenCalledWith('testuser');
      expect(result).toEqual(mockUser);
    });
  });

  describe('createUser', () => {
    const createDto = {
      email: 'new@example.com',
      username: 'newuser',
      password: 'hashed-password',
      firstName: 'New',
      lastName: 'User',
    };

    it('should create user when email does not already exist', async () => {
      usersRepository.findByEmail.mockResolvedValue(null);
      usersRepository.create.mockResolvedValue({ ...mockUser, ...createDto });

      const result = await service.createUser(createDto);

      expect(usersRepository.findByEmail).toHaveBeenCalledWith(createDto.email);
      expect(usersRepository.create).toHaveBeenCalledWith(createDto);
      expect(result).toMatchObject({ email: createDto.email });
    });

    it('should throw an error when user with that email already exists', async () => {
      usersRepository.findByEmail.mockResolvedValue(mockUser);

      await expect(service.createUser(createDto)).rejects.toThrow(
        'User already exists',
      );
      expect(usersRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('getAll', () => {
    it('should return paginated users without cursor', async () => {
      usersRepository.findAll.mockResolvedValue(mockUsers);

      const result = await service.getAll(undefined, 10);

      expect(usersRepository.findAll).toHaveBeenCalledWith({ take: 11 });
      expect(result.limit).toBe(10);
      expect(result.hasNextPage).toBe(false);
      expect(result.nextCursor).toBeNull();
    });

    it('should use cursor when provided', async () => {
      usersRepository.findAll.mockResolvedValue([mockUser]);

      await service.getAll('cursor-abc', 10);

      expect(usersRepository.findAll).toHaveBeenCalledWith({
        take: 11,
        skip: 1,
        cursor: { id: 'cursor-abc' },
      });
    });

    it('should set hasNextPage and nextCursor when more items exist', async () => {
      const rows = Array.from({ length: 11 }, (_, i) =>
        createMockUser({ id: `user-${i}` }),
      );
      usersRepository.findAll.mockResolvedValue(rows);

      const result = await service.getAll(undefined, 10);

      expect(result.hasNextPage).toBe(true);
      expect(result.nextCursor).toBe('user-9');
      expect(result.items).toHaveLength(10);
    });
  });

  describe('setRefreshTokenHash', () => {
    it('should hash the token and update the user', async () => {
      const hash = 'hashed-refresh-token';
      (bcrypt.hash as jest.Mock).mockResolvedValue(hash);
      usersRepository.update.mockResolvedValue(mockUser);

      await service.setRefreshTokenHash('user-123', 'raw-refresh-token');

      expect(bcrypt.hash).toHaveBeenCalledWith('raw-refresh-token', 10);
      expect(usersRepository.update).toHaveBeenCalledWith('user-123', {
        refreshTokenHash: hash,
      });
    });
  });

  describe('clearRefreshTokenHash', () => {
    it('should set refreshTokenHash to null', async () => {
      usersRepository.update.mockResolvedValue(mockUser);

      await service.clearRefreshTokenHash('user-123');

      expect(usersRepository.update).toHaveBeenCalledWith('user-123', {
        refreshTokenHash: null,
      });
    });
  });

  describe('updateRole', () => {
    it('should update user role', async () => {
      const dto = { role: UserRole.ADMIN };
      usersRepository.update.mockResolvedValue({
        ...mockUser,
        role: UserRole.ADMIN,
      });

      await service.updateRole('user-123', dto);

      expect(usersRepository.update).toHaveBeenCalledWith('user-123', {
        role: UserRole.ADMIN,
      });
    });
  });

  describe('updateStatus', () => {
    it('should update user status', async () => {
      const dto = { status: false } as any;
      usersRepository.update.mockResolvedValue({
        ...mockUser,
        isActive: false,
      });

      await service.updateStatus('user-123', dto);

      expect(usersRepository.update).toHaveBeenCalledWith('user-123', {
        status: false,
      });
    });
  });

  describe('updateProfile', () => {
    it('should update user profile fields', async () => {
      const dto = { firstName: 'Jane', lastName: 'Smith' } as any;
      usersRepository.update.mockResolvedValue({
        ...mockUser,
        firstName: 'Jane',
        lastName: 'Smith',
      });

      await service.updateProfile('user-123', dto);

      expect(usersRepository.update).toHaveBeenCalledWith('user-123', dto);
    });
  });

  describe('updatePassword', () => {
    it('should update password when current password is valid', async () => {
      const dto = {
        currentPassword: 'old-password',
        password: 'new-password',
      } as any;
      usersRepository.findById.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      usersRepository.update.mockResolvedValue(mockUser);

      await service.updatePassword('user-123', dto);

      expect(usersRepository.findById).toHaveBeenCalledWith('user-123');
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'old-password',
        mockUser.password,
      );
      expect(usersRepository.update).toHaveBeenCalledWith('user-123', dto);
    });

    it('should throw when user not found', async () => {
      usersRepository.findById.mockResolvedValue(null);

      await expect(
        service.updatePassword('nonexistent', {
          currentPassword: 'x',
          password: 'y',
        } as any),
      ).rejects.toThrow('User not found');
      expect(usersRepository.update).not.toHaveBeenCalled();
    });

    it('should throw when current password is invalid', async () => {
      usersRepository.findById.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        service.updatePassword('user-123', {
          currentPassword: 'wrong',
          password: 'new',
        } as any),
      ).rejects.toThrow('Invalid current password');
      expect(usersRepository.update).not.toHaveBeenCalled();
    });
  });
});

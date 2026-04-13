import { Inject, Injectable } from '@nestjs/common';
import { User } from 'generated/prisma/client';
import * as bcrypt from 'bcrypt';
import {
  IUsersRepository,
  USER_REPOSITORY,
} from './repositories/users.repository.interface';
import {
  PaginatedUsersResponseDto,
  UserResponseDto,
} from './dto/users.response.dto';
import {
  UpdateUserPasswordDto,
  UpdateUserProfileDto,
  UpdateUserRoleDto,
  UpdateUserStatusDto,
} from './dto/users.dto';
import { UserMapper } from './dto/user.mapper';

type CreateUserInput = Pick<
  User,
  'email' | 'username' | 'password' | 'firstName' | 'lastName'
>;
@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly usersRepository: IUsersRepository,
  ) {}

  async getUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }

  async getFindById(id: string): Promise<User | null> {
    return this.usersRepository.findById(id);
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findByUsername(username);
  }

  async createUser(data: CreateUserInput): Promise<User> {
    // Check if exists
    const existing =
      data.email && (await this.usersRepository.findByEmail(data.email));
    if (existing) {
      throw new Error('User already exists');
    }

    const safeData: CreateUserInput = {
      email: data.email,
      username: data.username,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    };

    return await this.usersRepository.create(safeData);
  }

  async getAll(
    cursor: string | undefined,
    limit: number,
  ): Promise<PaginatedUsersResponseDto> {
    const rows = await this.usersRepository.findAll({
      take: limit + 1,
      ...(cursor && { skip: 1, cursor: { id: cursor } }),
    });

    const hasNextPage = rows.length > limit;
    const items = hasNextPage ? rows.slice(0, limit) : rows;
    const nextCursor = hasNextPage ? items[items.length - 1].id : null;

    return {
      items: UserMapper.toResponseDto(items),
      limit,
      nextCursor,
      hasNextPage,
    };
  }

  async setRefreshTokenHash(
    userId: string,
    refreshTokenHash: string,
  ): Promise<void> {
    const hash = await bcrypt.hash(refreshTokenHash, 10);
    await this.usersRepository.update(userId, {
      refreshTokenHash: hash,
    });
  }

  async clearRefreshTokenHash(userId: string): Promise<void> {
    await this.usersRepository.update(userId, { refreshTokenHash: null });
  }

  async updateRole(
    userId: string,
    data: UpdateUserRoleDto,
  ): Promise<UserResponseDto> {
    const user = await this.usersRepository.update(userId, { role: data.role });
    return UserMapper.toResponseDto(user);
  }

  async updateStatus(
    userId: string,
    data: UpdateUserStatusDto,
  ): Promise<UserResponseDto> {
    const user = await this.usersRepository.update(userId, {
      status: data.status,
    });
    return UserMapper.toResponseDto(user);
  }

  async updateProfile(
    userId: string,
    data: UpdateUserProfileDto,
  ): Promise<UserResponseDto> {
    const user = await this.usersRepository.update(userId, data);
    return UserMapper.toResponseDto(user);
  }

  async updatePassword(
    userId: string,
    data: UpdateUserPasswordDto,
  ): Promise<UserResponseDto> {
    // check current password
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(
      data.currentPassword,
      user.password,
    );
    if (!isPasswordValid) {
      throw new Error('Invalid current password');
    }

    const newPass = await this.usersRepository.update(userId, data);
    return UserMapper.toResponseDto(newPass);
  }
}

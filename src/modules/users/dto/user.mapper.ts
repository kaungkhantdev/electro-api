import { plainToInstance } from 'class-transformer';
import { User } from 'generated/prisma/client';
import { UserResponseDto } from './users.response.dto';

export class UserMapper {
  static toResponseDto(user: User): UserResponseDto;
  static toResponseDto(user: User | null): UserResponseDto | null;
  static toResponseDto(users: User[]): UserResponseDto[];
  static toResponseDto(
    input: User | User[] | null,
  ): UserResponseDto | UserResponseDto[] | null {
    if (input === null) return null;
    return plainToInstance(UserResponseDto, input, {
      excludeExtraneousValues: true,
    });
  }
}

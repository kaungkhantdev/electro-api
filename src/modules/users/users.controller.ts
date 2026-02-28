import {
  Controller,
  Get,
  Param,
  UseGuards,
  NotFoundException,
  Patch,
  Body,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiParam,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserResponseDto } from './dto/users.response.dto';
import { RolesGuard } from '@/common/guards/role.guard';
import { plainToInstance } from 'class-transformer';
import { UpdateUserPasswordDto, UpdateUserProfileDto } from './dto/users.dto';

@ApiTags('Users')
@ApiBearerAuth('JWT-auth')
@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Get user by ID (Admin only)',
    description: 'Returns a specific user by their ID. Requires ADMIN role.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'User unique identifier',
    example: 'uuid-123',
  })
  @ApiResponse({
    status: 200,
    description: 'User retrieved successfully',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'User not found',
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authenticated',
  })
  @ApiForbiddenResponse({
    description: 'User does not have ADMIN role',
  })
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.usersService.getFindById(id);
    if (!user) throw new NotFoundException('Not found user');
    const result = plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
    return result;
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update user by ID',
    description: 'Updates a specific user by their ID. Requires ADMIN role.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'User unique identifier',
    example: 'uuid-123',
  })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'User not found',
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authenticated',
  })
  @ApiForbiddenResponse({
    description: 'User does not have ADMIN role',
  })
  async update(
    @Param('id') id: string,
    @Body() data: UpdateUserProfileDto,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.updateProfile(id, data);
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id/password')
  @ApiOperation({
    summary: 'Update user password by ID',
    description:
      'Updates a specific user password by their ID. Requires ADMIN role.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'User unique identifier',
    example: 'uuid-123',
  })
  @ApiResponse({
    status: 200,
    description: 'User password updated successfully',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'User not found',
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authenticated',
  })
  @ApiForbiddenResponse({
    description: 'User does not have ADMIN role',
  })
  async updatePassword(
    @Param('id') id: string,
    @Body() data: UpdateUserPasswordDto,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.updatePassword(id, data);
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }
}

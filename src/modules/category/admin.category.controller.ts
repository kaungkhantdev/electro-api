import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CursorPaginationDto } from 'src/common/dto/cursor-pagination.dto';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { RolesGuard } from '@/common/guards/role.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { UserRole } from 'generated/prisma/enums';

@Controller('admin/categories')
@UseGuards(RolesGuard)
@ApiBearerAuth('JWT-auth')
export class AdminCategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Get all categories',
    description: 'Returns a paginated list of all categories.',
  })
  @ApiResponse({
    status: 200,
    description: 'Categories list retrieved successfully',
  })
  async findAll(@Query() pagination: CursorPaginationDto) {
    return await this.categoryService.getAllCategories(
      pagination.cursor,
      pagination.limit,
    );
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Get category by ID',
    description: 'Returns a specific category by its ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Category retrieved successfully',
  })
  async findOne(@Param('id') id: string) {
    return await this.categoryService.getCategoryById(id);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Create a new category',
    description: 'Creates a new category.',
  })
  @ApiResponse({
    status: 201,
    description: 'Category created successfully',
  })
  async createCategory(@Body() data: CreateCategoryDto) {
    return this.categoryService.createCategory(data);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Update a category',
    description: 'Updates a category.',
  })
  @ApiResponse({
    status: 200,
    description: 'Category updated successfully',
  })
  async updateCategory(
    @Param('id') id: string,
    @Body() data: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id, data);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Delete a category',
    description: 'Deletes a category.',
  })
  @ApiResponse({
    status: 200,
    description: 'Category deleted successfully',
  })
  async deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }
}

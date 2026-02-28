import { Controller, Get, Param, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all categories',
    description: 'Returns a paginated list of all categories.',
  })
  @ApiResponse({
    status: 200,
    description: 'Categories list retrieved successfully',
  })
  async findAll(@Query() pagination: PaginationDto) {
    return await this.categoryService.getAllCategories(
      pagination.page,
      pagination.limit,
    );
  }

  @Get(':id')
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
}

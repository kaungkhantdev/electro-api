import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CursorPaginationDto } from 'src/common/dto/cursor-pagination.dto';
import { CreateProductDto, UpdateProductDto } from './dto/products.dto';
import { RolesGuard } from '@/common/guards/role.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from '@/common/decorators/roles.decorator';
import { UserRole } from 'generated/prisma/enums';

@Controller('admin/products')
@UseGuards(RolesGuard)
export class AdminProductController {
  constructor(private readonly productService: ProductService) {}

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
    return await this.productService.getAllProducts(
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
    return await this.productService.getProductById(id);
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
  async createProduct(@Body() data: CreateProductDto) {
    return this.productService.createProduct(data);
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
  async updateProduct(@Param('id') id: string, @Body() data: UpdateProductDto) {
    return this.productService.updateProduct(id, data);
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
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}

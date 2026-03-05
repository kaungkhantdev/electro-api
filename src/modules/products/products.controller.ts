import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductService } from './products.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CursorPaginationDto } from 'src/common/dto/cursor-pagination.dto';
import { Public } from '@/common/decorators/public.decorator';

@Public()
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all products',
    description: 'Returns a paginated list of all products.',
  })
  @ApiResponse({
    status: 200,
    description: 'Products list retrieved successfully',
  })
  async findAll(@Query() pagination: CursorPaginationDto) {
    return await this.productService.getAllProducts(
      pagination.cursor,
      pagination.limit,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get product by ID',
    description: 'Returns a specific product by its ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Product retrieved successfully',
  })
  async findOne(@Param('id') id: string) {
    return await this.productService.getProductById(id);
  }
}

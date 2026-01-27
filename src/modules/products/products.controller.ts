import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Public } from '@/common/decorators/public.decorator';
import { ApiQuery } from '@nestjs/swagger';
import { CursorPaginationDto } from '@/common/dto/pagination.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  // @Get()
  // @Public()
  // @ApiQuery({ name: 'page', example: 1, required: false })
  // @ApiQuery({ name: 'limit', example: 10, required: false })
  // findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
  //   return this.productsService.findAll(+(page ?? 1), +(limit ?? 10));
  // }

  @Get()
  @Public()
  @ApiQuery({ name: 'limit', example: 10, required: false })
  @ApiQuery({
    name: 'cursor',
    required: false,
    description: 'Product ID to start after',
  })
  findAll(@Query() query: CursorPaginationDto) {
    return this.productsService.findAll(query.cursor, query.limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}

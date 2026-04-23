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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CursorPaginationDto } from 'src/common/dto/cursor-pagination.dto';
import { RolesGuard } from '@/common/guards/role.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from '@/common/decorators/roles.decorator';
import { UserRole } from 'generated/prisma/enums';
import { BrandService } from './brand.service';
import { CreateBrandDto, UpdateBrandDto } from './dto/brand.dto';

@Controller('admin/brands')
@UseGuards(RolesGuard)
export class AdminBrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Get all brands',
    description: 'Returns a paginated list of all brands.',
  })
  @ApiResponse({
    status: 200,
    description: 'Brands list retrieved successfully',
  })
  async findAll(@Query() pagination: CursorPaginationDto) {
    return await this.brandService.getAllBrands(
      pagination.cursor,
      pagination.limit,
    );
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Get brand by ID',
    description: 'Returns a specific brand by its ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Brand retrieved successfully',
  })
  async findOne(@Param('id') id: string) {
    return await this.brandService.getBrandById(id);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Create a new brand',
    description: 'Creates a new brand.',
  })
  @ApiResponse({
    status: 201,
    description: 'Brand created successfully',
  })
  async createBrand(@Body() data: CreateBrandDto) {
    return this.brandService.createBrand(data);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Update a brand',
    description: 'Updates a brand.',
  })
  @ApiResponse({
    status: 200,
    description: 'Brand updated successfully',
  })
  async updateBrand(@Param('id') id: string, @Body() data: UpdateBrandDto) {
    return this.brandService.updateBrand(id, data);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Delete a brand',
    description: 'Deletes a brand.',
  })
  @ApiResponse({
    status: 200,
    description: 'Brand deleted successfully',
  })
  async deleteBrand(@Param('id') id: string) {
    return this.brandService.deleteBrand(id);
  }
}

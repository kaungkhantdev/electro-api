import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  BRAND_REPOSITORY,
  IBrandRepository,
} from './repositories/interface/brand.repository.interface';
import { CreateBrandDto } from './dto/brand.dto';
import { Brand } from 'generated/prisma/browser';
import { PaginatedBrandsResponseDto } from './dto/brand.response.dto';
import { paginate } from '@/common/utils/pagination.util';
import { BrandMapper } from './dto/brand.mapper';

@Injectable()
export class BrandService {
  constructor(
    @Inject(BRAND_REPOSITORY)
    private readonly brandRepository: IBrandRepository,
  ) {}

  private generateSlug(name: string): string {
    return name.toLowerCase().replace(/\s+/g, '-');
  }

  private async hasSlug(slug: string): Promise<boolean> {
    return (await this.brandRepository.findBySlug(slug)) !== null;
  }

  async createBrand(dto: CreateBrandDto): Promise<Brand> {
    const slug = this.generateSlug(dto.name);
    if (await this.hasSlug(slug))
      throw new ConflictException('Slug already exists');
    return await this.brandRepository.create({ ...dto, slug });
  }

  async getBrandById(id: string): Promise<Brand> {
    const brand = await this.brandRepository.findById(id);
    if (!brand) throw new NotFoundException('Brand not found');
    return brand;
  }

  async getBrandBySlug(slug: string): Promise<Brand> {
    const brand = await this.brandRepository.findBySlug(slug);
    if (!brand) throw new NotFoundException('Brand not found');
    return brand;
  }

  async updateBrand(id: string, dto: CreateBrandDto): Promise<Brand> {
    await this.getBrandById(id);
    const newSlug = this.generateSlug(dto.name);

    if (await this.hasSlug(newSlug))
      throw new ConflictException('Slug already exists');

    return await this.brandRepository.update(id, {
      ...dto,
      slug: newSlug,
    });
  }

  async deleteBrand(id: string): Promise<void> {
    await this.getBrandById(id);
    await this.brandRepository.delete(id);
  }

  async getAllBrands(
    cursor: string | undefined,
    limit: number,
  ): Promise<PaginatedBrandsResponseDto> {
    const rows = await this.brandRepository.findAll({
      take: limit + 1,
      ...(cursor && { skip: 1, cursor: { id: cursor } }),
    });

    const { items, hasNextPage, nextCursor } = paginate(rows, limit);

    return {
      items: BrandMapper.toResponseDto(items),
      limit,
      nextCursor,
      hasNextPage,
    };
  }
}

import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import {
  BRANDS_REPOSITORY,
  IBrandsRepository,
} from './repositories/brands.repository.interface';

@Injectable()
export class BrandsService {
  constructor(
    @Inject(BRANDS_REPOSITORY)
    private readonly brandsRepository: IBrandsRepository,
  ) {}

  async create(createBrandDto: CreateBrandDto) {
    const slug = createBrandDto.name.toLowerCase().replace(/\s+/g, '-');
    return await this.brandsRepository.create({
      ...createBrandDto,
      slug,
    });
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [brands, total] = await Promise.all([
      this.brandsRepository.findAll({ skip, take: limit }),
      this.brandsRepository.count(),
    ]);

    return {
      items: brands,
      page,
      limit,
      total,
    };
  }

  async findOne(id: string) {
    const brand = await this.brandsRepository.findById(id);
    if (!brand) throw new BadRequestException('Brand not found');
    return brand;
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    const brand = await this.brandsRepository.findById(id);
    if (!brand) throw new BadRequestException('Brand not found');
    return await this.brandsRepository.update(id, updateBrandDto);
  }

  async remove(id: string) {
    await this.findOne(id); // Ensure brand exists

    if (await this.brandsRepository.hasProducts(id)) {
      throw new BadRequestException(
        'Cannot delete brand with associated products',
      );
    }

    return await this.brandsRepository.delete(id);
  }
}

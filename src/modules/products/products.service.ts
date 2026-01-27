import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  IProductsRepository,
  PRODUCTS_REPOSITORY,
} from './repositories/products.repository.interface';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCTS_REPOSITORY)
    private readonly productsRepository: IProductsRepository,
  ) {}
  create(createProductDto: CreateProductDto) {
    return this.productsRepository.create(createProductDto);
  }

  // async findAll(page: number, limit: number) {
  //   const skip = (page - 1) * limit;
  //   const [products, total] = await Promise.all([
  //     this.productsRepository.findAll({ skip, take: limit }),
  //     this.productsRepository.count(),
  //   ]);

  //   return {
  //     items: products,
  //     page,
  //     limit,
  //     total,
  //   };
  // }

  // cursor based pagination
  async findAll(cursor?: string, limit: number = 10) {
    const products = await this.productsRepository.findAll({
      take: limit + 1,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      orderBy: { createdAt: 'desc' },
    });

    const hasNextPage = products.length > limit;
    const items = hasNextPage ? products.slice(0, -1) : products;

    return {
      items,
      limit,
      nextCursor: hasNextPage ? items[items.length - 1]?.id : null,
      prevCursor: cursor ?? null, // the cursor we received is our "prev"
    };
  }

  findOne(id: string) {
    return this.productsRepository.findOne(id);
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productsRepository.update(id, updateProductDto);
  }

  remove(id: string) {
    return this.productsRepository.delete(id);
  }
}

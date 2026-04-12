import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { CATEGORY_REPOSITORY } from './repositories/interfaces/category.repository.interface';

const mockCategory = {
  id: 'cat-1',
  name: 'Electronics',
  slug: 'electronics',
  description: 'Electronic devices',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepository: {
    create: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
    findById: jest.Mock;
    findAll: jest.Mock;
  };

  beforeEach(async () => {
    categoryRepository = {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        { provide: CATEGORY_REPOSITORY, useValue: categoryRepository },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createCategory', () => {
    it('should generate a slug from the name and pass it to the repository', async () => {
      const dto = {
        name: 'New Category',
        description: 'A new category',
      } as any;
      categoryRepository.create.mockResolvedValue({
        ...mockCategory,
        name: 'New Category',
        slug: 'new-category',
      });

      await service.createCategory(dto);

      expect(categoryRepository.create).toHaveBeenCalledWith({
        name: 'New Category',
        description: 'A new category',
        slug: 'new-category',
      });
    });

    it('should generate slug by lowercasing and replacing spaces with hyphens', async () => {
      const dto = { name: 'Home & Garden Tools' } as any;
      categoryRepository.create.mockResolvedValue(mockCategory);

      await service.createCategory(dto);

      expect(categoryRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ slug: 'home-&-garden-tools' }),
      );
    });

    it('should handle single-word names without hyphens', async () => {
      const dto = { name: 'Electronics' } as any;
      categoryRepository.create.mockResolvedValue(mockCategory);

      await service.createCategory(dto);

      expect(categoryRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ slug: 'electronics' }),
      );
    });
  });

  describe('updateCategory', () => {
    it('should delegate to categoryRepository.update', async () => {
      const dto = { name: 'Updated Electronics' } as any;
      categoryRepository.update.mockResolvedValue({
        ...mockCategory,
        name: 'Updated Electronics',
      });

      await service.updateCategory('cat-1', dto);

      expect(categoryRepository.update).toHaveBeenCalledWith('cat-1', dto);
    });
  });

  describe('deleteCategory', () => {
    it('should delegate to categoryRepository.delete', async () => {
      categoryRepository.delete.mockResolvedValue(mockCategory);

      await service.deleteCategory('cat-1');

      expect(categoryRepository.delete).toHaveBeenCalledWith('cat-1');
    });
  });

  describe('getCategoryById', () => {
    it('should return category when found', async () => {
      categoryRepository.findById.mockResolvedValue(mockCategory);

      await service.getCategoryById('cat-1');

      expect(categoryRepository.findById).toHaveBeenCalledWith('cat-1');
    });

    it('should return null when category not found', async () => {
      categoryRepository.findById.mockResolvedValue(null);

      await service.getCategoryById('nonexistent');

      expect(categoryRepository.findById).toHaveBeenCalledWith('nonexistent');
    });
  });

  describe('getAllCategories', () => {
    it('should return paginated categories without cursor', async () => {
      const rows = [mockCategory, { ...mockCategory, id: 'cat-2' }];
      categoryRepository.findAll.mockResolvedValue(rows);

      const result = await service.getAllCategories(undefined, 10);

      expect(categoryRepository.findAll).toHaveBeenCalledWith({ take: 11 });
      expect(result.limit).toBe(10);
      expect(result.hasNextPage).toBe(false);
      expect(result.nextCursor).toBeNull();
    });

    it('should use cursor when provided', async () => {
      categoryRepository.findAll.mockResolvedValue([mockCategory]);

      await service.getAllCategories('cursor-abc', 10);

      expect(categoryRepository.findAll).toHaveBeenCalledWith({
        take: 11,
        skip: 1,
        cursor: { id: 'cursor-abc' },
      });
    });

    it('should set hasNextPage and nextCursor when more items exist', async () => {
      const rows = Array.from({ length: 11 }, (_, i) => ({
        ...mockCategory,
        id: `cat-${i}`,
      }));
      categoryRepository.findAll.mockResolvedValue(rows);

      const result = await service.getAllCategories(undefined, 10);

      expect(result.hasNextPage).toBe(true);
      expect(result.nextCursor).toBe('cat-9');
      expect(result.items).toHaveLength(10);
    });
  });
});

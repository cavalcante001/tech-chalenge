import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from '../../application/categories.service';
import { QueryBus } from '@nestjs/cqrs';
import { CategoryReadModel } from '../../domain/read-models/category.read-model';
import { GetCategoriesQueryHandler } from '../../application/queries/get-categories.query-handler';
import { FindCategoriesRepository } from '../../application/ports/find-categories.repository';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let categoriesService: CategoriesService;

  const mockCategories: CategoryReadModel[] = [
    {
      id: '1',
      name: 'Category 1',
    },
    {
      id: '2',
      name: 'Category 2',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        CategoriesService,
        GetCategoriesQueryHandler,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn().mockResolvedValue(mockCategories),
          },
        },
        {
          provide: FindCategoriesRepository,
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockCategories),
          },
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    categoriesService = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const result = await controller.findAll();
      expect(result).toEqual(mockCategories);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from 'src/products/application/products.service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductReadModel } from 'src/products/domain/read-models/product.read-model';
import { IdResponse } from 'src/common/presenters/http/dto/id.response.dto';
import { ProductStock } from 'src/products/domain/value-objects/product-stock';

describe('ProductsController', () => {
  let controller: ProductsController;
  let productsService: ProductsService;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  const mockProduct: ProductReadModel = {
    id: '1',
    name: 'Test Product',
    description: 'Test Description',
    price: 99.99,
    categoryId: 'category-123',
    stock: new ProductStock(10),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    productsService = module.get<ProductsService>(ProductsService);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a product and return its id', async () => {
      // Arrange
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        categoryId: 'category-123',
        stock: 10,
      };
      const expectedId = '1';
      jest.spyOn(commandBus, 'execute').mockResolvedValue(expectedId);

      // Act
      const result = await controller.create(createProductDto);

      // Assert
      expect(result).toBeInstanceOf(IdResponse);
      expect(result.id).toBe(expectedId);
      expect(commandBus.execute).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      // Arrange
      const mockProducts = [mockProduct];
      jest.spyOn(queryBus, 'execute').mockResolvedValue(mockProducts);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toEqual(mockProducts);
      expect(queryBus.execute).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a product by id', async () => {
      // Arrange
      const productId = '1';
      jest.spyOn(queryBus, 'execute').mockResolvedValue(mockProduct);

      // Act
      const result = await controller.findOne(productId);

      // Assert
      expect(result).toEqual(mockProduct);
      expect(queryBus.execute).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a product and return its id', async () => {
      // Arrange
      const productId = '1';
      const updateProductDto: UpdateProductDto = {
        name: 'Updated Product',
        price: 149.99,
      };
      jest.spyOn(commandBus, 'execute').mockResolvedValue(productId);

      // Act
      const result = await controller.update(productId, updateProductDto);

      // Assert
      expect(result).toBeInstanceOf(IdResponse);
      expect(result.id).toBe(productId);
      expect(commandBus.execute).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove a product and return its id', async () => {
      // Arrange
      const productId = '1';
      jest.spyOn(commandBus, 'execute').mockResolvedValue(productId);

      // Act
      const result = await controller.remove(productId);

      // Assert
      expect(result).toBeInstanceOf(IdResponse);
      expect(result.id).toBe(productId);
      expect(commandBus.execute).toHaveBeenCalled();
    });
  });
});

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductQuery } from './get-product.query';
import { ProductReadModel } from '../../domain/read-models/product.read-model';
import { ProductRepository } from '../ports/product.repository';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetProductQuery)
export class GetProductQueryHandler
  implements IQueryHandler<GetProductQuery, ProductReadModel>
{
  constructor(private readonly productsRepository: ProductRepository) {}

  async execute(query: GetProductQuery): Promise<ProductReadModel> {
    const product = await this.productsRepository.findById(query.id);
    if (!product) {
      throw new NotFoundException(`Product with id ${query.id} not found`);
    }
    return product;
  }
} 
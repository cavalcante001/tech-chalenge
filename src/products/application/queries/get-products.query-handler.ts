import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductsQuery } from './get-products.query';
import { ProductReadModel } from '../../domain/read-models/product.read-model';
import { ProductRepository } from '../ports/product.repository';

@QueryHandler(GetProductsQuery)
export class GetProductsQueryHandler
  implements IQueryHandler<GetProductsQuery, ProductReadModel[]>
{
  constructor(private readonly productsRepository: ProductRepository) {}

  async execute(query: GetProductsQuery) {
    return this.productsRepository.findAll();
  }
}

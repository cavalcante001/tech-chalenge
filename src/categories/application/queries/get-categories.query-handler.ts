import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCategoriesQuery } from './get-categories.query';
import { FindCategoriesRepository } from '../ports/find-categories.repository';
import { CategoryReadModel } from '../../domain/read-models/category.read-model';

@QueryHandler(GetCategoriesQuery)
export class GetCategoriesQueryHandler
  implements IQueryHandler<GetCategoriesQuery, CategoryReadModel[]>
{
  constructor(
    private readonly categoriesRepository: FindCategoriesRepository,
  ) {}

  async execute(query: GetCategoriesQuery) {
    return this.categoriesRepository.findAll();
  }
}

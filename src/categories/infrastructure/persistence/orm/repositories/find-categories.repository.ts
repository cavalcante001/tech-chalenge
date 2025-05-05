import { Injectable } from '@nestjs/common';
import { FindCategoriesRepository } from 'src/categories/application/ports/find-categories.repository';
import { CategoryReadModel } from 'src/categories/domain/read-models/category.read-model';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryMapper } from '../mappers/category.mapper';

@Injectable()
export class OrmFindCategoriesRepository implements FindCategoriesRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}
  async findAll(): Promise<CategoryReadModel[]> {
    const categories = await this.categoryRepository.find();
    return categories.map(CategoryMapper.toDomain);
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './orm/entities/category.entity';
import { FindCategoriesRepository } from 'src/categories/application/ports/find-categories.repository';
import { OrmFindCategoriesRepository } from './orm/repositories/find-categories.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [
    {
      provide: FindCategoriesRepository,
      useClass: OrmFindCategoriesRepository,
    },
  ],
  exports: [FindCategoriesRepository],
})
export class OrmCategoriesPersistenceModule {}

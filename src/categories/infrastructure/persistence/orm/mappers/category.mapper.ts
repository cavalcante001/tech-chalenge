import { Category } from "src/categories/domain/category";
import { CategoryEntity } from "../entities/category.entity";

export class CategoryMapper {
  static toDomain(categoryEntity: CategoryEntity): Category {
    const categoryModel = new Category(categoryEntity.id, categoryEntity.name);
    return categoryModel;
  }
}

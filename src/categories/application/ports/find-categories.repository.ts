import { CategoryReadModel } from "src/categories/domain/read-models/category.read-model";

export abstract class FindCategoriesRepository {
    abstract findAll(): Promise<CategoryReadModel[]>
}
import { CategoryReadModel } from "src/categories/domain/read-models/category.read-model";

export abstract class CategoryRepository {
    abstract findAll(): Promise<CategoryReadModel[]>
    abstract findById(id: string): Promise<CategoryReadModel>
}
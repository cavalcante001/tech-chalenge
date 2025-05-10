import { Product } from "src/products/domain/product";

export abstract class ProductRepository {
    abstract save(product: Product): Promise<Product>
}
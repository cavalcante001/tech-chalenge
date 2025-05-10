import { Product } from 'src/products/domain/product';
import { ProductEntity } from '../entities/product.entity';
import { ProductStock } from 'src/products/domain/value-objects/product-stock';

export class ProductMapper {
  static toDomain(productEntity: ProductEntity): Product {
    const productStock = new ProductStock(productEntity.stock);

    return new Product(
      productEntity.id,
      productEntity.name,
      productEntity.description,
      productEntity.price,
      productEntity.category_id,
      productStock
    );
  }

  static toPersistence(product: Product): ProductEntity {
    const entity = new ProductEntity();
    const now = new Date();

    entity.id = product.id;
    entity.name = product.name;
    entity.description = product.description;
    entity.price = product.price;
    entity.category_id = product.categoryId;
    entity.stock = product.stock.value;
    entity.createdAt = now;
    entity.updatedAt = now;
    
    return entity;
  }
}

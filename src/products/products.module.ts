import { Module } from '@nestjs/common';
import { ProductsService } from './application/products.service';
import { ProductsController } from './presenters/http/products.controller';
import { ProductFactory } from './domain/factories/product.fatory';
import { CreateProductCommandHandler } from './application/commands/create-product.command-handler';
import { ProductsInfrastructureModule } from './infrastructure/persistence/products-infrastructure.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductFactory, CreateProductCommandHandler],
  imports: [ProductsInfrastructureModule, CategoriesModule],
})
export class ProductsModule {}

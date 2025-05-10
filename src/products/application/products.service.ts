import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductCommand } from './commands/create-product.command';
import { GetProductsQuery } from './queries/get-products.query';
import { GetProductQuery } from './queries/get-product.query';
import { UpdateProductCommand } from './commands/update-product.command';
import { DeleteProductCommand } from './commands/delete-product.command';

@Injectable()
export class ProductsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create(createProductCommand: CreateProductCommand) {
    return this.commandBus.execute(createProductCommand);
  }

  findAll() {
    return this.queryBus.execute(new GetProductsQuery());
  }

  findOne(id: string) {
    return this.queryBus.execute(new GetProductQuery(id));
  }

  update(command: UpdateProductCommand) {
    return this.commandBus.execute(command);
  }

  remove(id: string) {
    return this.commandBus.execute(new DeleteProductCommand(id));
  }
}

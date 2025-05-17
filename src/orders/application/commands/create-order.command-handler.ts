import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from './create-order.command';
import { ProductRepository } from 'src/products/application/ports/product.repository';
import { OrderFactory } from 'src/orders/domain/factories/order.factory';
import { CustomerRepository } from 'src/customers/application/ports/customer.repository';
import { Logger, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from 'src/categories/application/ports/categories.repository';
import { CreateOrderRepository } from '../ports/create-order.repository';

@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler
  implements ICommandHandler<CreateOrderCommand>
{
  private readonly logger = new Logger(CreateOrderCommandHandler.name);

  constructor(
    private readonly productRepository: ProductRepository,
    private readonly orderFactory: OrderFactory,
    private readonly customerRepository: CustomerRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly orderRepository: CreateOrderRepository,
  ) {}

  async execute(command: CreateOrderCommand) {
    this.logger.debug(
      `Processing "CreateOrderCommand": ${JSON.stringify(command)}`,
    );
    if (command.customerId) {
      const customer = await this.customerRepository.findById(
        command.customerId,
      );

      if (!customer) {
        throw new NotFoundException('Customer not found');
      }
    }

    const products = await this.productRepository.findManyByIds(
      command.items.map((item) => item.productId),
    );

    const productIds = command.items.map((item) => item.productId);
    const foundIds = new Set(products.map((p) => p.id));
    const missing = productIds.filter((id) => !foundIds.has(id));

    if (missing.length > 0) {
      throw new Error(`Produtos não encontrados: ${missing.join(', ')}`);
    }

    const categoryIds = [...new Set(products.map((p) => p.categoryId))];
    const categories = await this.categoryRepository.findManyByIds(categoryIds);
    const categoryMap = new Map(categories.map((c) => [c.id, c.name]));

    const productMap = new Map(products.map((p) => [p.id, p]));

    const itemData = command.items.map(({ productId, quantity }) => {
      const product = productMap.get(productId);
      if (!product) {
        throw new Error(`Product not found: ${productId}`);
      }

      const categoryName = categoryMap.get(product.categoryId);
      if (!categoryName) {
        throw new Error(`Category not found for product ${productId}`);
      }

      return { product, quantity, categoryName };
    });

    const order = this.orderFactory.create(command.customerId, itemData);

    const newOrder = await this.orderRepository.save(order);

    return newOrder.id;
  }
}

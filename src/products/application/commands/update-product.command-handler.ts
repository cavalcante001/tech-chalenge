import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProductCommand } from './update-product.command';
import { ProductRepository } from '../ports/product.repository';
import { NotFoundException } from '@nestjs/common';
import { ProductFactory } from '../../domain/factories/product.fatory';

@CommandHandler(UpdateProductCommand)
export class UpdateProductCommandHandler
  implements ICommandHandler<UpdateProductCommand>
{
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productFactory: ProductFactory,
  ) {}

  async execute(command: UpdateProductCommand): Promise<string> {
    const existingProduct = await this.productRepository.findById(command.id);
    
    if (!existingProduct) {
      throw new NotFoundException(`Product with id ${command.id} not found`);
    }

    const updatedProduct = this.productFactory.create(
      command.data.name ?? existingProduct.name,
      command.data.description ?? existingProduct.description,
      command.data.price ?? existingProduct.price,
      command.data.categoryId ?? existingProduct.categoryId,
      command.data.stock ?? existingProduct.stock.value,
    );

    const savedProduct = await this.productRepository.save(updatedProduct);
    return savedProduct.id;
  }
} 
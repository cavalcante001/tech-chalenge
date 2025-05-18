import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOrdersQuery } from './get-orders.query';
import { Order } from '../../domain/order';
import { OrderRepository } from '../ports/order.repository';
import { OrderReadModel } from 'src/orders/domain/read-models/order.read-model';
import { GetOrderPaymentQrcodeQuery } from './get-order.payment-qrcode';
import { NotFoundException } from '@nestjs/common';
import { GenerateQrCode } from '../ports/order.generate-qrcode';


@QueryHandler(GetOrderPaymentQrcodeQuery)
export class GetOrderPaymentQrcodeQueryHandler implements IQueryHandler<GetOrderPaymentQrcodeQuery> {
  constructor(private readonly orderRepository: OrderRepository, private readonly generateQrCode: GenerateQrCode) {}

  async execute(query: GetOrderPaymentQrcodeQuery) {
    const order = await this.orderRepository.findById(query.id);
    
    if (!order) {
      throw new NotFoundException(`Order with id ${query.id} not found`);
    }
    console.log(order.items[0].productDescription)

    return this.generateQrCode.generateQrCode({
      orderId: order.id,
      totalAmount: order.total,
      items: order.items.map(product => ({
        category: product.categoryName,
        title: product.productName,
        description: product.productDescription,
        quantity: product.quantity,
        unitPrice: product.unitPrice,
        totalAmount: product.totalPrice
        })),
    });
  }
}
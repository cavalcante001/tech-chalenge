import { Module } from '@nestjs/common';
import { OrdersService } from './application/orders.service';
import { OrdersController } from './presenters/http/orders.controller';
import { CreateOrderCommandHandler } from './application/commands/create-order.command-handler';
import { ProductsModule } from 'src/products/products.module';
import { OrderFactory } from './domain/factories/order.factory';
import { CustomersModule } from 'src/customers/customers.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { OrdersInfrastructureModule } from './infrastructure/orders-infrastructure.module';
import { GetOrdersQueryHandler } from './application/queries/get-orders.query-handler';
import { GetOrderQueryHandler } from './application/queries/get-order.query-handler';
import { GetOrderPaymentQrcodeQueryHandler } from './application/queries/get-order.payment-qrcode.query-handler';
import { GatewayMercadoPagoModule } from './infrastructure/gateways/mercado-pago.module';
import { UpdateOrderStatusCommandHandler } from './application/commands/update-order-status.command-handler';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService, 
    CreateOrderCommandHandler, 
    OrderFactory,
    GetOrdersQueryHandler,
    GetOrderQueryHandler,
    GetOrderPaymentQrcodeQueryHandler,
    UpdateOrderStatusCommandHandler
  ],
  imports: [
    ProductsModule,
    CustomersModule,
    CategoriesModule,
    OrdersInfrastructureModule,
    GatewayMercadoPagoModule,
  ],
})
export class OrdersModule {}

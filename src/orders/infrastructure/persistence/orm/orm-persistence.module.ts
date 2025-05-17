import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderEntity } from "./entities/order.entity";
import { OrderItemEntity } from "./entities/order-item.entity";
import { CreateOrderRepository } from "src/orders/application/ports/create-order.repository";
import { OrmCreateOrderRepository } from "./repositories/create-order.repository";
import { FindOrdersRepository } from "src/orders/application/ports/find-orders.repository";
import { OrmFindOrdersRepository } from "./repositories/find-orders.repository";
import { OrderSummaryView } from "./views/order-summary.view";

@Module({
    imports: [TypeOrmModule.forFeature([OrderEntity, OrderItemEntity, OrderSummaryView])],
    providers: [
        {
            provide: CreateOrderRepository,
            useClass: OrmCreateOrderRepository,
        },
        {
            provide: FindOrdersRepository,
            useClass: OrmFindOrdersRepository,
        }
    ],
    exports: [CreateOrderRepository, FindOrdersRepository]
})
export class OrmOrderPersistenceModule {}
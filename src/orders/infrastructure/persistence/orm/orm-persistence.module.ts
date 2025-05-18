import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderEntity } from "./entities/order.entity";
import { OrderItemEntity } from "./entities/order-item.entity";
import { OrderRepository } from "src/orders/application/ports/order.repository";
import { OrmOrderRepository } from "./repositories/order.repository";
import { OrderReadyRepository } from "src/orders/application/ports/order-ready.repository";
import { OrmOrderReadyRepository } from "./repositories/order-read.repository.ts";
import { OrderSummaryView } from "./views/order-summary.view";

@Module({
    imports: [TypeOrmModule.forFeature([OrderEntity, OrderItemEntity, OrderSummaryView])],
    providers: [
        {
            provide: OrderRepository,
            useClass: OrmOrderRepository,
        },
        {
            provide: OrderReadyRepository,
            useClass: OrmOrderReadyRepository,
        }
    ],
    exports: [OrderRepository, OrderReadyRepository]
})
export class OrmOrderPersistenceModule {}
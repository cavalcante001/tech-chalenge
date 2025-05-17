import { Logger } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { OrderCreatedEvent } from "src/orders/domain/events/order-created.event";
import { CreateOrderRepository } from "../ports/create-order.repository";

@EventsHandler(OrderCreatedEvent)
export class OrderCreatedEventHandler implements IEventHandler<OrderCreatedEvent> {
    private readonly logger = new Logger(OrderCreatedEventHandler.name);

    constructor(private readonly orderRepository: CreateOrderRepository) {}

    async handle(event: OrderCreatedEvent) {
        this.logger.log(`Order created event: ${JSON.stringify(event)}`);

        await this.orderRepository.refreshReadModel();
    }
}

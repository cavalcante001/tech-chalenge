import { Order } from "src/orders/domain/order";

export abstract class CreateOrderRepository {
    abstract save(order: Order): Promise<Order>
}
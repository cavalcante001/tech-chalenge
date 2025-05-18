import { OrderReadModel } from "src/orders/domain/read-models/order.read-model";

export abstract class OrderReadyRepository {
  abstract findAll(): Promise<OrderReadModel[]>;
  abstract findById(id: string): Promise<OrderReadModel | null>;
}
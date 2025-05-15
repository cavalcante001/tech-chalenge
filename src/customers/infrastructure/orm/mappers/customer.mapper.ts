import { Customer } from "src/customers/domain/customer";
import { CustomerEntity } from "../entities/customer.entity";
import e from "express";


export class CustomerMapper {
  static toDomain(customerEntity: CustomerEntity): Customer {

    return new Customer(
      customerEntity.id,
      customerEntity.name,
      customerEntity.email,
      customerEntity.cpf,
      customerEntity.createdAt,
      customerEntity.updatedAt
    );
  }

  static toPersistence(customer: Customer): CustomerEntity {
    const entity = new CustomerEntity();

    entity.id = customer.id;
    entity.name = customer.name;
    entity.email = customer.email;
    entity.cpf = customer.cpf;
    entity.createdAt = customer.createdAt;
    entity.updatedAt = customer.updatedAt;
    
    return entity;
  }
}

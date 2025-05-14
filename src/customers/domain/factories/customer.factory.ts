import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Customer } from '../customer';

@Injectable()
export class CustomerFactory {
  create(
    name: string,
    email: string,
    cpf: string
  ): Customer {
    const now = new Date();

    return new Customer(
      randomUUID(),
      name,
      email,
      cpf,
      now,
      now
    );
  }

  update(existing: Customer, name?: string, email?: string, cpf?: string): Customer {
    if (name && name !== existing.name) {
      existing.updateName(name);
    }
    if (email && email !== existing.email) {
      existing.updateEmail(email);
    }
    if (cpf && cpf !== existing.cpf) {
      existing.updateCpf(cpf);
    }
    return existing;
  }
  
}

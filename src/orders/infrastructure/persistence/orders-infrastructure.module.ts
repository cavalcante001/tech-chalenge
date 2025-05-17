import { Module } from '@nestjs/common';
import { OrmOrderPersistenceModule } from './orm/orm-persistence.module';

@Module({
  imports: [OrmOrderPersistenceModule],
  exports: [OrmOrderPersistenceModule],
})
export class OrdersInfrastructureModule {}

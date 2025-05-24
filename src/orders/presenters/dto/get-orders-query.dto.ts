import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export enum PaymentStatus {
  PENDING = 'pending',
  RECEIVED = 'received',
  PREPARING = 'preparing',
  READY = 'ready',
  FINISHED = 'finished',
}
export class GetOrdersQueryDto {
  @ApiProperty({
    description: 'Status do pagamento do pedido',
    enum: PaymentStatus,
    required: false,
    example: PaymentStatus.PREPARING,
  })
  @IsOptional()
  @IsEnum(PaymentStatus)
  paymentStatus?: PaymentStatus;
}
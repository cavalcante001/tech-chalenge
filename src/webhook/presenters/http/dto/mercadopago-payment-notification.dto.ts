import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsDateString, IsObject, ValidateNested } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class PaymentDataDto {
  @ApiProperty({
    description: 'Payment ID',
    example: '112790218746'
  })
  @IsString()
  id: string;
}

export class MercadoPagoPaymentNotificationDto {
  @ApiProperty({
    description: 'Action type',
    example: 'payment.created'
  })
  @IsString()
  action: string;

  @ApiProperty({
    description: 'API version',
    example: 'v1'
  })
  @IsString()
  api_version: string;

  @ApiProperty({
    description: 'Payment data',
    type: PaymentDataDto
  })
  @ValidateNested()
  @Type(() => PaymentDataDto)
  @IsObject()
  data: PaymentDataDto;

  @ApiProperty({
    description: 'Creation date',
    example: '2025-05-25T17:22:19Z'
  })
  @IsDateString()
  date_created: string;

  @ApiProperty({
    description: 'Notification ID',
    example: '121584908225'
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Whether the payment is in live mode',
    example: true
  })
  @IsBoolean()
  live_mode: boolean;

  @ApiProperty({
    description: 'Type of notification',
    example: 'payment'
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'Application ID',
    example: '7638198099120330'
  })
  @IsString()
  application_id: string;

  @ApiProperty({
    description: 'Status',
    example: 'opened'
  })
  @IsString()
  status: string;

  @ApiProperty({
    description: 'Version',
    example: 0
  })
  @IsNumber()
  version: number;

  @ApiProperty({
    description: 'User ID',
    example: '2440640118'
  })
  @IsString()
  @Transform(({ value }) => value?.toString())
  user_id: string;
}
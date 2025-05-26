import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProcessMercadoPagoWebhookCommand } from './process-mercadopago-webhook.command';
import { MercadoPagoPaymentGateway } from 'src/common/infrastructure/gateway/mercadopago/port/mercadopago-payment-gateway.port';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { OrderRepository } from 'src/orders/application/ports/order.repository';
import { OrderStatus } from 'src/orders/domain/value-objects/order-status';

@CommandHandler(ProcessMercadoPagoWebhookCommand)
export class ProcessMercadoPagoWebhookCommandHandler
  implements ICommandHandler<ProcessMercadoPagoWebhookCommand>
{
  private readonly logger = new Logger(
    ProcessMercadoPagoWebhookCommandHandler.name,
  );
  constructor(
    private readonly generateQrCode: MercadoPagoPaymentGateway,
    private readonly orderRepository: OrderRepository,
  ) {}
  async execute(command: ProcessMercadoPagoWebhookCommand) {
    try {
      this.logger.debug(
        `Processing "ProcessMercadoPagoWebhookCommand": ${JSON.stringify(command)}`,
      );
      const payment = await this.generateQrCode.getPayment(command.id);

      if (payment.status === 'approved') {
        const order = await this.orderRepository.findById(
          payment.external_reference,
        );

        if (order) {
          order.status = new OrderStatus('received');
          order.markAsPaid(
            payment.id.toString(),
            new Date(payment.date_approved),
            payment.transaction_details.total_paid_amount,
          );
          await this.orderRepository.save(order);
          await this.orderRepository.refreshReadModel();
        }
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}

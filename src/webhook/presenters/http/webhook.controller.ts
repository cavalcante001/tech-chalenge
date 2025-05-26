import { Controller, Post, Body} from '@nestjs/common';
import { WebhookService } from '../../application/webhook.service';
import { MercadoPagoPaymentNotificationDto } from './dto/mercadopago-payment-notification.dto';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { ProcessMercadoPagoWebhookCommand } from 'src/webhook/application/commands/process-mercadopago-webhook.command';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('/mercadopago')
  @ApiExcludeEndpoint()
  async handleWebhookNotification(
    @Body() mercadoPagoPaymentNotificationDto: MercadoPagoPaymentNotificationDto,
  ) {
    return this.webhookService.processWebhookNotification(
      new ProcessMercadoPagoWebhookCommand(
        mercadoPagoPaymentNotificationDto.data.id,
        mercadoPagoPaymentNotificationDto.type
      )
    );
  }
}

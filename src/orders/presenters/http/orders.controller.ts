import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpStatus,
} from '@nestjs/common';
import { OrdersService } from '../../application/orders.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiProperty,
} from '@nestjs/swagger';
import { IdResponse } from 'src/common/presenters/http/dto/id.response.dto';
import { CreateOrderCommand } from 'src/orders/application/commands/create-order.command';
import { OrderReadModel } from 'src/orders/domain/read-models/order.read-model';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo pedido' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: IdResponse,
  })
  async create(@Body() createOrderDto: CreateOrderDto) {
    const id = await this.ordersService.create(
      new CreateOrderCommand(createOrderDto.items, createOrderDto.customerId),
    );

    return new IdResponse(id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os pedidos' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [OrderReadModel],
    description: 'Lista de pedidos retornada com sucesso',
  })
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um pedido pelo ID' })
  @ApiParam({
    name: 'id',
    description: 'ID do pedido',
    type: 'string',
    example: 'd79e7d79-c087-4597-8c02-304bbf83b407',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: OrderReadModel,
    description: 'Pedido encontrado com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Pedido não encontrado',
  })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Post(':id/payment-qrcode')
  @ApiOperation({ summary: 'Gerar QR code de pagamento' })
  @ApiParam({
    name: 'id',
    description: 'Identificador único do pedido',
    type: 'string',
    example: 'cd8fce34-5045-43f2-96ff-ab36b717bbad',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'QR code gerado com sucesso',
    schema: {
      properties: {
        in_store_order_id: {
          type: 'string',
          example: 'cd8fce34-5045-43f2-96ff-ab36b717bbad',
          description: 'Identificador do pedido na loja',
        },
        qr_data: {
          type: 'string',
          example:
            '00020101021243650016COM.MERCADOLIBRE020130636cd8fce34-5045-43f2-96ff-ab36b717bbad5204000053039865802BR5909Test Test6009SAO PAULO62070503***63045742',
          description: 'Dados do QR code para pagamento',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Pedido não encontrado',
  })
  async generatePaymentQrcode(@Param('id') id: string) {
    return this.ordersService.generatePaymentQrcode(id);
  }
}

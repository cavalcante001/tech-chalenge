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
import { ApiOperation, ApiResponse, ApiParam, ApiBody, ApiProperty } from '@nestjs/swagger';
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
    description: 'Lista de pedidos retornada com sucesso'
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
    example: 'd79e7d79-c087-4597-8c02-304bbf83b407'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: OrderReadModel,
    description: 'Pedido encontrado com sucesso'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Pedido não encontrado'
  })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um pedido' })
  @ApiParam({
    name: 'id',
    description: 'ID do pedido',
    type: 'string',
    example: 'd79e7d79-c087-4597-8c02-304bbf83b407'
  })
  @ApiBody({ type: UpdateOrderDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Pedido atualizado com sucesso'
  })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Post(':id/payment-qrcode')
  async generatePaymentQrcode(@Param('id') id: string) {
    return this.ordersService.generatePaymentQrcode(id);
  }
}


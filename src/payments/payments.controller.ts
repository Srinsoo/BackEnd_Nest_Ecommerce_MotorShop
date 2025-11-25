import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // Endpoint para crear la orden de pago
  @Post('create')
  async createPayment(@Body() dto: CreatePaymentDto) {
    return this.paymentsService.createOrder(dto);
  }

  // Endpoint para recibir notificaciones de Mercado Pago (webhook)
  @Post('webhook')
  async webhook(@Body() payload: any) {
    return // await this.paymentsService.handleWebhook(payload);
  }

  @Get('success')
  success() {
    return { message: 'Pago exitoso (simulación)' };
  }

  @Get('failure')
  failure() {
    return { message: 'Pago fallido' };
  }

  @Get('pending')
  pending() {
    return { message: 'Pago pendiente' };
  }


};


/*   @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(+id);
  } */

import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import {PrismaService} from '../prisma/prisma.service';
import { MercadoPagoConfig, Preference } from 'mercadopago';

@Injectable()
export class PaymentsService {

  private preference: Preference;

  constructor(private readonly prisma: PrismaService) {
    const mpClient = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN as string,
    });
    this.preference = new Preference(mpClient);
  }

  async createOrder({ productId, quantity}: CreatePaymentDto) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId
      }
    });

    if (!product) throw new NotFoundException('Product not found');

    const total = product.price * quantity;

    //Integracion de Mercado pago para generar ordenes de pago
    const preference = {
       items: [
        {
          id: product.id.toString(),
          title: product.name ?? `Producto ${product.id}`,
          quantity,
          unit_price: product.price,
          currency_id: 'COP',
        },
      ],
      back_urls: {
        success: process.env.MP_SUCCESS_URL!,
        failure: process.env.MP_FAILURE_URL!,
        pending: process.env.MP_PENDING_URL!,
      },

      //auto_return: 'approved',
      //external_reference: `prod_${product.id}_qty_${quantity}_${Date.now()}`,
    };

    // Aquí sí llamamos al SDK
    const response = await this.preference.create({ body: preference });

    return {
      init_point: response.init_point,
      sandbox_init_point: response.sandbox_init_point,
      total,
    };




  };

}

/*   findAll() {
    return `This action returns all payments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  } */
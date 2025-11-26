import { Injectable } from '@nestjs/common';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class ShoppingCartService {
  
  constructor(private prisma: PrismaService) {}
  
  async create(data: CreateShoppingCartDto) {
    return this.prisma.shopping_cart.create({
      data: {
        productId: data.productId,
        quantity: data.quantity,
      },
      include: { product: true}
    });
  }

  async findAll() {
    return  this.prisma.shopping_cart.findMany({
      include: {product: true},
    });
  }

  async findOne(id: number) {
    return this.prisma.shopping_cart.findUnique({
      where: { id },
      include: { product: true },
    });
  }

  async update(id: number, data: UpdateShoppingCartDto) {
    return this.prisma.shopping_cart.update({
      where: { id },
      data,
      include: { product: true },
    });
  }

  async remove(id: number) {
    return this.prisma.shopping_cart.delete({
      where: { id },
    });
  }
}

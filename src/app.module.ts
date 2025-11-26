import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma/prisma.service';
import { PaymentsModule } from './payments/payments.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [ProductsModule, PaymentsModule, ShoppingCartModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

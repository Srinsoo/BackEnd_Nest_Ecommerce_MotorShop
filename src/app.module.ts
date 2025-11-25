import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma/prisma.service';
import { PaymentsModule } from './payments/payments.module';


@Module({
  imports: [ProductsModule, PaymentsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}

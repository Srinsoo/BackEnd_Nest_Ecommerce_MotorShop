import {IsInt, IsPositive, ValidateNested} from 'class-validator';
import { Type } from 'class-transformer';


class CartItemDto {
  @Type(() => Number) @IsInt() @IsPositive()
  productId: number;

  @Type(() => Number) @IsInt() @IsPositive()
  quantity: number;
}

export class CreatePaymentDto {
  @ValidateNested({ each: true })
  @Type(() => CartItemDto)
  cartItems: CartItemDto[];
}
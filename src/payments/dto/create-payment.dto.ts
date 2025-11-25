import {IsInt, IsPositive} from 'class-validator';
import { Type } from 'class-transformer';


export class CreatePaymentDto {
    
    @Type(() => Number) @IsInt() @IsPositive()
    productId: number;

    @Type(() => Number) @IsInt() @IsPositive()
    quantity: number;
}

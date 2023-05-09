import { IsNotEmpty, IsNumber } from 'class-validator';

export class PersonDto {
  @IsNotEmpty() @IsNumber() user: number;
}
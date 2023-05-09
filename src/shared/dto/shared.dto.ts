import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';

export class IdDto {
  @IsNumber()
  id: number;
}
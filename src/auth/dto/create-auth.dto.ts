
import { IsEmail, IsNotEmpty, IsString } from '@nestjs/class-validator';

export class CreateAuthDto {


    @IsNotEmpty()
    @IsString()
    name: string
    @IsNotEmpty()
    @IsEmail()
    email: string

}

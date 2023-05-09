import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MinLength,
  } from 'class-validator';
  
  export class RegisterUserDto {
    @IsNotEmpty() @IsString() @MinLength(5) username: string;
    @IsNotEmpty() @IsString() @MinLength(5) password: string;
    @IsNotEmpty() @IsString() full_name: string;
    @IsOptional() @IsString() @MinLength(5) display_name: string;
  }
  
  export class UpdateUserDto {
    @IsOptional() @IsString() full_name;
    @IsOptional() @IsString() display_name;
    @IsOptional() @IsNumber({}, { each: true }) friends;
  }
  
  export class FriendListDto {
    @IsNumber({}, { each: true }) friends: number[];
  }
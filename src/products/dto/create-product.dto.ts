import { IsArray, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateProductDto {

    @IsString()
    @MinLength(1)
    title: string;

    @IsNumber()
    @IsPositive()
    pricePublic: number;

    @IsNumber()
    @IsPositive()
    price15: number;

    @IsNumber()
    @IsPositive()
    price25: number;

    @IsNumber()
    @IsPositive()
    price35: number;

    @IsNumber()
    @IsPositive()
    price42: number;

    @IsNumber()
    @IsPositive()
    price50: number;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    image?: string;
}


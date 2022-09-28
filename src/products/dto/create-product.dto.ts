import { IsArray, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateProductDto {

    @IsString()
    @MinLength(1)
    title: string;

    @IsNumber()
    @IsPositive()
    pricepublic: number;

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

    @IsNumber()
    @IsPositive()
    pv: number;

    @IsString()
    @IsOptional()
    image?: string;

    @IsString()
    @MinLength(3)
    sku: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    categoryId?: string;
}


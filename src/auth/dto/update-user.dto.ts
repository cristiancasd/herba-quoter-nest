import { IsEmail, IsIn, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class UpdateUserDto {

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
            message: 'The password must have a Uppercase, lowercase letter and a number'
        })
    password: string;

    @IsOptional()
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
            message: 'The password must have a Uppercase, lowercase letter and a number'
        })
    newPassword: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    fullName: string;
    
    @IsOptional()
    @IsString()
    @MinLength(1)
    @IsIn(['cliente','cliente-15', 'cliente-25', 'cliente-35',
    'distribuidor-25', 'distribuidor-35','distribuidor-42', 'supervisor'])
    herbalifeLevel: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    country?: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    profilePhoto?: string;

}


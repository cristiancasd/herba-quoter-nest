import { IsEmail, IsIn, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @IsEmail()
    email: string;
    
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
            message: 'The password must have a Uppercase, lowercase letter and a number'
        })
    password: string;

    @IsString()
    @MinLength(1)
    fullName: string;

    @IsIn(['user','admin','super-admin'])
    roles: string;

    @IsIn(['cliente','cliente-15', 'cliente-25', 'cliente-35',
    'distribuidor-25', 'distribuidor-35','distribuidor-42', 'supervisor'])
    herbalifeLevel: string;
}


import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateAuthDto extends PartialType(CreateUserDto) {
}
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { PaginationDto } from '../common/dto/pagination.dto';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ValidRoles } from './interfaces/valid-roles';

@Controller('auth') 
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }


  @Get()
  @Auth(ValidRoles.admin, ValidRoles.superAdmin)
  findAll(@Query() paginationDto: PaginationDto ) {
    return this.authService.findAll(paginationDto);
  }


  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.authService.findOne(term);
  }

  @Patch('admin/:id')
  @Auth(ValidRoles.admin, ValidRoles.superAdmin)
  update(@Param('id', ParseUUIDPipe) id: string, 
  @Body() updateAuthDto: UpdateAuthDto) 
  {
    return this.authService.update(id, updateAuthDto);
  }

  @Patch(':id')
  @Auth()
  updateUser(@Param('id', ParseUUIDPipe) id: string, 
  @Body() updateUserDto: UpdateUserDto,
  @GetUser(/*Aquí va la Data*/)user: User) 
  {
    return this.authService.updateUser(id, updateUserDto, user);
  }

  @Delete(':id')
  @Auth()
  
  remove(
    @Param('id', ParseUUIDPipe) id: string,    
    @GetUser(/*Aquí va la Data*/)user: User) 
  {
    return this.authService.remove(id, user);
  }
}

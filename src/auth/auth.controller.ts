import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { PaginationDto } from '../common/dto/pagination.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
  findAll(@Query() paginationDto: PaginationDto ) {
    return this.authService.findAll(paginationDto);
  }


  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.authService.findOne(term);
  }



  @Patch('admin/:id')
  update(@Param('id', ParseUUIDPipe) id: string, 
  @Body() updateAuthDto: UpdateAuthDto) 
  {
    return this.authService.update(id, updateAuthDto);
  }

  @Patch(':id')
  updateUser(@Param('id', ParseUUIDPipe) id: string, 
  @Body() updateUserDto: UpdateUserDto) 
  {
    return this.authService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.authService.remove(id);
  }
}

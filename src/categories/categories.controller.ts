import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories') 
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    ) {}

  @Post()
  @Auth(ValidRoles.admin, ValidRoles.superAdmin)
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @GetUser()user: User) {
    return this.categoriesService.create(createCategoryDto, user);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto ) {
    return this.categoriesService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.categoriesService.findOne(term);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin, ValidRoles.superAdmin)
  updateCategory(
    @Param('id', ParseUUIDPipe) id: string,  
    @Body() updateCategoryDto: UpdateCategoryDto,
    @GetUser()user: User) {
    return this.categoriesService.update(id, updateCategoryDto, user);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin, ValidRoles.superAdmin)
  remove(
    @Param('id', ParseUUIDPipe) id: string,  
    @Body() updateCategoryDto: UpdateCategoryDto,
    @GetUser()user: User) {
    return this.categoriesService.remove(id, user);
  }

  @Post(':term')
  @Auth(ValidRoles.admin, ValidRoles.superAdmin)
  reactive(
    @Param('term') term: string,  
    //@Body() updateCategoryDto: UpdateCategoryDto,
    @GetUser()user: User) {
    return this.categoriesService.reactive(term, user);
  }
}

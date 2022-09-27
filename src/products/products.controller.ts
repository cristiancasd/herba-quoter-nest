import { Controller, Get, Post, Body, Patch, Param, Delete, Query,ParseUUIDPipe, Headers} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('products') 
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

 
  @Post()
  @Auth(ValidRoles.admin, ValidRoles.superAdmin)
  create(
    @Body() createProductDto: CreateProductDto,
    @Headers() idCategory: string,
    @GetUser()user: User) {
    return this.productsService.create(createProductDto, user, idCategory);
  }
  
  @Get()
  findAll(@Query() paginationDto: PaginationDto ) {
    return this.productsService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.productsService.findOne(term);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin, ValidRoles.superAdmin)
  updateCategory(
    @Param('id', ParseUUIDPipe) id: string,  
    @Body() updateProductDto: UpdateProductDto,
    @GetUser() user: User) {
    return this.productsService.update(id, updateProductDto, user);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin, ValidRoles.superAdmin)
  remove(
    @Param('id', ParseUUIDPipe) id: string,  
    @GetUser()user: User) {
    return this.productsService.remove(id, user);
  }

  @Post(':term')
  @Auth(ValidRoles.admin, ValidRoles.superAdmin)
  reactive(
    @Param('term') term: string,  
    @GetUser()user: User) {
    return this.productsService.reactive(term, user);
  }
}

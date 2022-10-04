import { Injectable, BadRequestException,} from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';
import { fileNamer } from './helpers/fileNamer';
import { ProductsService } from '../products/products.service';
import { User } from 'src/auth/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class FilesService {

  constructor(
    private readonly productsService: ProductsService,
    private readonly authService: AuthService, 
  ){}

  async updateImage(file: Express.Multer.File, id:string , user: User, colection: string){
    if(!file) throw new BadRequestException(`file Type is incorrect`);
    const newImageName= fileNamer(file.originalname);
    try{
      //toDO subir imagenes cloudinary
    }catch(error){}
    
    
    if(colection!='user'&&colection!='product') throw new BadRequestException(`colection "${colection}" is not correct`);
      return (colection=='product' )
        ? this.productsService.update(id, {image: newImageName}, user)
        : this.authService.update(id, {profilephoto: newImageName})
  }

  getStaticProductImage(imageName: string){
    const path=join( __dirname, '../../static/products', imageName)
    if(!existsSync(path))
        throw new BadRequestException(`No product found with image ${imageName}`)  
    return path;
  }

}


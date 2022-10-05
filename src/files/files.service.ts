import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException,} from '@nestjs/common';
import { User } from 'src/auth/entities/user.entity';
import { deleteImageCloudinary, uploadImageCloudinary } from './helpers/uploadImageCloudinary';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
  ){}

  async updateImage(file: Express.Multer.File, id:string , user: User, colection: string){
    if(!file) throw new BadRequestException(`file Type is incorrect`);
    
    if(colection!='user'&&colection!='product') throw new BadRequestException(`colection "${colection}" is not correct`);
    
    let modelo: Product | User;

    (colection=='product' )
        ? modelo = await this.productRepository.preload({id})
        : modelo = await this.authRepository.preload({id})   
 
    if(!modelo) throw new NotFoundException(`${colection} with id ${id} not found`)
    if(!modelo.isactive) throw new BadRequestException(`${colection} with id ${id} is Inactive`);
    
    if(modelo.image) await deleteImageCloudinary(modelo.image)
    
    const {secure_url}= await uploadImageCloudinary(file,colection).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
    try{      
      return (colection=='product' )
        ? await this.productRepository.save({ ...modelo, image: secure_url ,user})
        : await this.authRepository.save({ ...modelo, image: secure_url})
    }catch(error){
      this.handleDBErrors(error)
    }
  }

  private handleDBErrors(error: any){
    if(error.code==='23505')
      throw new BadRequestException(error.detail);
    console.log(error)
    throw new InternalServerErrorException('Please check server logs')
  }

}


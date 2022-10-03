import { Injectable, BadRequestException } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';
import { fileNamer } from './helpers/fileNamer';

@Injectable()
export class FilesService {

  create(file: Express.Multer.File, id:string ){

     console.log('create in service', file)

     if(!file) throw new BadRequestException(`file Type is incorrect`) 

     let temporalName=file.originalname
     const newImageName= fileNamer(temporalName)
     console.log('newImageName ...',newImageName)

    return file;
  }

  getStaticProductImage(imageName: string){
    const path=join( __dirname, '../../static/products', imageName)
    if(!existsSync(path))
        throw new BadRequestException(`No product found with image ${imageName}`)  
    return path;
  }
}


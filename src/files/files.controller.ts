import { Controller, Patch, Param, UseInterceptors,
   UploadedFile, ParseUUIDPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { FilesService } from './files.service';
import { fileFilter } from './helpers/fileFilter.helper';
import { Express } from 'express'
import { ValidRoles } from 'src/auth/interfaces/valid-roles';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Patch('/:colection/:id')
  @Auth(ValidRoles.admin, ValidRoles.superAdmin)
  @UseInterceptors(FileInterceptor('file',{
    fileFilter: fileFilter, // Si viene un file. Reviso si el file es una imagen
  }))  
  uploadFile( 
    @Param('id', ParseUUIDPipe) id: string,   
    @Param('colection') colection: string, 
    @UploadedFile() file: Express.Multer.File,
    @GetUser()user: User
  ) {
    return this.filesService.updateImage(file, id, user, colection)
  }
}
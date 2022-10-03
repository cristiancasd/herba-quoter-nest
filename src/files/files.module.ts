import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [
    ConfigModule,
    PassportModule.register({defaultStrategy:'jwt'}),   
  ]
})
export class FilesModule {}

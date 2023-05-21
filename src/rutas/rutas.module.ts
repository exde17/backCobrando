import { Module } from '@nestjs/common';
import { RutasService } from './rutas.service';
import { RutasController } from './rutas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ruta } from './entities/ruta.entity';

@Module({
  controllers: [RutasController],
  providers: [RutasService],
  imports: [TypeOrmModule.forFeature([Ruta])],
})
export class RutasModule {}

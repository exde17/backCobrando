import { Module } from '@nestjs/common';
import { RutasService } from './rutas.service';
import { RutasController } from './rutas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ruta } from './entities/ruta.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [RutasController],
  providers: [RutasService],
  imports: [TypeOrmModule.forFeature([Ruta]),
  AuthModule],
})
export class RutasModule {}

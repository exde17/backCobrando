import { Module } from '@nestjs/common';
import { BarrioService } from './barrio.service';
import { BarrioController } from './barrio.controller';
import { Barrio } from './entities/barrio.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from 'src/auth/interfaces';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [BarrioController],
  providers: [BarrioService],
  imports: [TypeOrmModule.forFeature([Barrio]), AuthModule],
})
export class BarrioModule {}

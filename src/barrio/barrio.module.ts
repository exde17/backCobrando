import { Module } from '@nestjs/common';
import { BarrioService } from './barrio.service';
import { BarrioController } from './barrio.controller';
import { Barrio } from './entities/barrio.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [BarrioController],
  providers: [BarrioService],
  imports: [TypeOrmModule.forFeature([Barrio])],
})
export class BarrioModule {}

import { Module } from '@nestjs/common';
import { CobradorService } from './cobrador.service';
import { CobradorController } from './cobrador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cobrador } from './entities/cobrador.entity';

@Module({
  controllers: [CobradorController],
  providers: [CobradorService],
  imports: [TypeOrmModule.forFeature([Cobrador])],
})
export class CobradorModule {}

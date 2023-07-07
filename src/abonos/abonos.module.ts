import { Module } from '@nestjs/common';
import { AbonosService } from './abonos.service';
import { AbonosController } from './abonos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Abono } from './entities/abono.entity';
import { User } from 'src/auth/entities/user.entity';

@Module({
  controllers: [AbonosController],
  providers: [AbonosService],
  imports: [TypeOrmModule.forFeature([Abono, User])],
})
export class AbonosModule {}

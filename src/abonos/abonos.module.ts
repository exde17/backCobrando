import { Module } from '@nestjs/common';
import { AbonosService } from './abonos.service';
import { AbonosController } from './abonos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Abono } from './entities/abono.entity';
import { User } from 'src/auth/entities/user.entity';
import { PrestamoModule } from '../prestamo/prestamo.module';
import { Prestamo } from 'src/prestamo/entities/prestamo.entity';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  controllers: [AbonosController],
  providers: [AbonosService],
  imports: [TypeOrmModule.forFeature([Abono,Prestamo]),
  PrestamoModule, AuthModule],
  
})
export class AbonosModule {}

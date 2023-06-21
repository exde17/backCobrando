import { Module } from '@nestjs/common';
import { PrestamoService } from './prestamo.service';
import { PrestamoController } from './prestamo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prestamo } from './entities/prestamo.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [PrestamoController],
  providers: [PrestamoService],
  imports: [
    TypeOrmModule.forFeature([Prestamo]),
    AuthModule
  ],
})
export class PrestamoModule {}

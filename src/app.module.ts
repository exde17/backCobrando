import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { RutasModule } from './rutas/rutas.module';
import { AbonosModule } from './abonos/abonos.module';
import { PrestamoModule } from './prestamo/prestamo.module';
import { BarrioModule } from './barrio/barrio.module';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10), //|| 5432,
      username: process.env.DB_NAME,
      password: process.env.DB_PASS,
      database: process.env.DB_USER,
      autoLoadEntities: true,
      synchronize: true,
    }),
    
    CommonModule,
    RutasModule,
    AbonosModule,
    PrestamoModule,
    BarrioModule,
    AuthModule,
    ClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

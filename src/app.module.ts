import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonasModule } from './personas/personas.module';
import { CommonModule } from './common/common.module';
import { CobradorModule } from './cobrador/cobrador.module';
import { ClienteModule } from './cliente/cliente.module';
import { RutasModule } from './rutas/rutas.module';
import { AbonosModule } from './abonos/abonos.module';
import { PrestamoModule } from './prestamo/prestamo.module';
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
    PersonasModule,
    CommonModule,
    CobradorModule,
    ClienteModule,
    RutasModule,
    AbonosModule,
    PrestamoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

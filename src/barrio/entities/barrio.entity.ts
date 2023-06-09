import { ApiProperty } from '@nestjs/swagger';
// import { Ruta } from 'src/rutas/entities/ruta.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Barrio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column('text', {
    nullable: false,
    name: 'nombre_barrio',
  })
  nombre_barrio: string;

  // @ManyToOne(() => Ruta, (ruta) => ruta.barrio)
  // ruta: Ruta;
}

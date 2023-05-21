import { Cobrador } from 'src/cobrador/entities/cobrador.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ruta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    array: true,
    default: [],
  })
  barrio: string[];

  @ManyToOne(() => Cobrador, (cobrador) => cobrador.ruta)
  cobrador: Cobrador;
}

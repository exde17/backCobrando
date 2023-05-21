import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ruta } from '../../rutas/entities/ruta.entity';
import { Persona } from 'src/personas/entities/persona.entity';

@Entity()
export class Cobrador {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  estado: string;

  @OneToMany(() => Ruta, (ruta) => ruta.cobrador, { cascade: true })
  ruta?: Ruta[];

  @OneToOne(() => Persona, (persona) => persona.cobrador, { cascade: true })
  persona?: Persona;
}

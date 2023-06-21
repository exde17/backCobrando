import { User } from 'src/auth/entities/user.entity';
import { Barrio } from 'src/barrio/entities/barrio.entity';
import { Client } from 'src/client/entities/client.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Ruta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    array: true,
    default: [],
  })
  barrio: string[];
  // @OneToMany(() => Barrio, (barrio) => barrio.ruta, { cascade: true })
  // barrio: Barrio;

  @Column('text', {
    nullable: false,
    name: 'nombre',
  })
  nombre: string;

  @ManyToOne(() => User, (user) => user.ruta)
  user: User;

  @OneToMany(()=> Client, 
  (client)=> client.ruta, { cascade: true })
  client: Client
}

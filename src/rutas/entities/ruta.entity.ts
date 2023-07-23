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
import { NombreRutas } from '../utils/nombre.enum';
import { EstadoEnum } from '../utils/estado.enum';

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
    // enum: NombreRutas,
    name: 'nombre',
  })
  nombre: string;

  @Column('enum',{
    nullable: false,
    enum: EstadoEnum,
    default: EstadoEnum.ACTIVO,
    name: 'estado'
  })
  estado: EstadoEnum
  
  @ManyToOne(() => User, (user) => user.ruta)
  user: User;

  @OneToMany(()=> Client, 
  (client)=> client.ruta)
  client: Client
}

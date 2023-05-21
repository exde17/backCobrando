import { Cobrador } from 'src/cobrador/entities/cobrador.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { v4 as uuid } from 'uuid';
//determina la db con todos los datos que necesita, despues se cuadra el dto para poder colocar los validadores recordar instalar "npm add class-validator class-transformer"
@Entity()
export class Persona {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    nullable: false,
  })
  nombre1: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  nombre2: string;

  @Column('numeric', {
    default: 0,
  })
  documento: number;

  @Column({
    type: 'numeric',
    default: 0,
  })
  telefono: number;

  @Column({
    type: 'numeric',
    nullable: true,
  })
  edad: number;

  @Column('text', {
    nullable: false,
  })
  apellido1: string;

  @Column('text', {
    nullable: true,
  })
  apellido2: string;

  @Column('text', {
    nullable: false,
  })
  direccion: string;

  @Column('numeric', {
    default: 0,
    nullable: false,
  })
  telefonoFamiliar: number;

  @OneToOne(() => Cobrador, (cobrador) => cobrador.persona)
  @JoinColumn()
  cobrador?: Cobrador;
}

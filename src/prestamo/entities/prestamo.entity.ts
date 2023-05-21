import { Abono } from 'src/abonos/entities/abono.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Prestamo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Abono, (abono) => abono.prestamo, { cascade: true })
  abono: Abono;

  @ManyToOne(() => Cliente, (cliente) => cliente.prestamo)
  cliente: Cliente;

  @Column({
    type: 'numeric',
    default: 0,
  })
  valor: number;

  @Column({
    type: 'numeric',
    default: 0,
  })
  intereses: number;

  @Column('numeric', {
    default: 0,
  })
  dias: number;
}

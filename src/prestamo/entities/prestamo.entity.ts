import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';
import { Abono } from 'src/abonos/entities/abono.entity';
import { User } from 'src/auth/entities/user.entity';
import { Client } from 'src/client/entities/client.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,  
} from 'typeorm';
import { Estado } from '../utils/estado.enum';

@Entity()
export class Prestamo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Abono, (abono) => abono.prestamo, { cascade: true })
  abonos: Abono[];

  @ManyToOne(() => User, (user) => user.prestamo, {eager: true})
  user: User;

  @ManyToOne(() => Client, (client) => client.prestamos)
client: Client;

  @ApiProperty()
  @Column({
    name: 'valor_prestamo',
    type: 'numeric',
    nullable: false
  })
  valor_prestamo: number;

  @ApiProperty()
  @Column({
    type: 'numeric',
    default: 10,
  })
  intereses: number;

  @ApiProperty()
  @Column('numeric', {
    default: 30,
  })
  dias: number;

  @Column({
     type: 'date', 
     name: 'fecha_limite' 
    })
  fecha: Date;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createAt: Date

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updateAt: Date

  @ApiProperty()
  @Column('enum',{
    enum: Estado,
    default: Estado.ACTIVO,
  })
  estado: Estado;

  @ApiProperty()
  @Column({
    name: 'valor_total',
    type: 'numeric',
  })
  valor_total: number;

  @ApiProperty()
  @Column({
    name: 'valor_cuotas',
    type: 'numeric',
  })
  valor_cuotas: number;
}

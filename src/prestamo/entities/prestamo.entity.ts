import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';
import { Abono } from 'src/abonos/entities/abono.entity';
import { User } from 'src/auth/entities/user.entity';
import { Client } from 'src/client/entities/client.entity';
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

  @ManyToOne(() => User, (user) => user.prestamo, {eager: true})
  user: User;

  @ManyToOne(()=> Client, (client)=> client.prestamo,{eager: true})
  client: Client;

  @ApiProperty()
  @Column({
    name: 'valor_prestamo',
    type: 'numeric',
    default: 0,
  })
  valor_prestamo: number;

  @ApiProperty()
  @Column({
    type: 'numeric',
    default: 0,
  })
  intereses: number;

  @ApiProperty()
  @Column('numeric', {
    default: 0,
  })
  dias: number;

  @ApiProperty({
    description: 'Fecha de prestamo',
    nullable: false,
  })
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  fecha: Date;

  @ApiProperty()
  @Column()
  estado: string;

  @ApiProperty()
  @Column({
    name: 'valor_total',
    type: 'numeric',
    default: 0,
  })
  valor_total: number;
}

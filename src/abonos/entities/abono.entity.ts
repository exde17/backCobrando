import { Prestamo } from 'src/prestamo/entities/prestamo.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsDate, IsNotEmpty } from 'class-validator'; 
import { Transform } from 'class-transformer';
import { User } from 'src/auth/entities/user.entity';

@Entity()
export class Abono {
  @PrimaryGeneratedColumn('uuid') 
  id: string;

  @ManyToOne(() => Prestamo, (prestamo) => prestamo.abonos)
  prestamo: Prestamo;

  @ManyToOne(()=> User, (user) => user.abono)
  user: User;

  @ApiProperty()
  @Column('text', {
    nullable: false,
    name: 'valor_abono',
  })
  valor_abono: number;

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
}

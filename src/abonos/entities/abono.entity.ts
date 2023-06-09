import { Prestamo } from 'src/prestamo/entities/prestamo.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsDate, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

@Entity()
export class Abono {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Prestamo, (prestamo) => prestamo.abono)
  prestamo: Prestamo;

  @ApiProperty()
  @Column('text', {
    nullable: false,
    name: 'valor_abono',
  })
  valor_abono: number;

  @ApiProperty({
    description: 'Fecha de abono',
    nullable: false,
  })
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  fecha: Date;
}

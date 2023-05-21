import { Prestamo } from 'src/prestamo/entities/prestamo.entity';
import { Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Abono {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Prestamo, (prestamo) => prestamo.abono)
  prestamo: Prestamo;
}

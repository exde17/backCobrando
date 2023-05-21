import { Prestamo } from 'src/prestamo/entities/prestamo.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Prestamo, (prestamo) => prestamo.cliente, { cascade: true })
  prestamo: Prestamo;
}

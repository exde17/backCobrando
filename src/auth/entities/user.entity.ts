import { Prestamo } from 'src/prestamo/entities/prestamo.entity';
import { Ruta } from 'src/rutas/entities/ruta.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('text', {
    nullable: false,
    select: false,
  })
  password: string;

  @Column('text', {
    nullable: false,
  })
  fullName: string;

  @Column('text', {
    unique: true,
    nullable: false,
  })
  documento: string;

  @Column('text', {
    nullable: false,
  })
  telefono: string;

  @Column('text', {})
  edad: string;

  @Column('text', {
    unique: true,
    nullable: false,
  })
  email: string;

  @Column('text', {
    nullable: false,
  })
  direccion: string;

  @Column('text', {})
  telefonoFamiliar: string;

  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @OneToMany(() => Prestamo, (prestamo) => prestamo.user, { cascade: true })
  prestamo: Prestamo;

  @OneToMany(() => Ruta, (ruta) => ruta.user, { cascade: true })
  ruta?: Ruta[];

  @BeforeInsert()
  checketEmailInsert() {
    this.email = this.email.toLowerCase();
  }

  @BeforeUpdate()
  checketEmailUpdate() {
    this.email = this.email.toLowerCase();
  }
}

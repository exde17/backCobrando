import { Prestamo } from 'src/prestamo/entities/prestamo.entity';
import { Ruta } from 'src/rutas/entities/ruta.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('client')
export class Client {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
        nullable: false,
        name: 'fullName'
    })
    fullName: string;

    @Column('text',{
        nullable: false,
        name: 'documento'
    })
    documento: string;

    @Column('text',{
        nullable: false,
        name: 'telefono'
    })
    telefono: string;

    @Column('text',{
        nullable: true,
        name: 'email'
    })
    email: string;

    @Column('text',{
        nullable: false,
        name: 'direccion'
    })
    direccion: string;

    @Column('text',{
        nullable: false,
        name: 'telefonoFamiliar'
    })
    telefonoFamiliar: string;

    @Column('bool',{
        nullable: false,
        default: true,
        name: 'estado'
    })
    estado: boolean;

    // @OneToMany(()=> Prestamo, 
    // (prestamo) => prestamo.client, 
    // {cascade: true})
    // prestamo: Prestamo
    @OneToMany(() => Prestamo, (prestamo) => prestamo.client, { cascade: true })
prestamos: Prestamo[];

    @ManyToOne(()=> Ruta, 
    (ruta)=> ruta.client,
    )
    ruta: Ruta


}

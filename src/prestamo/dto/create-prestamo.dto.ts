import { ApiProperty } from "@nestjs/swagger";
import { UUID } from "crypto";
import { Column } from "typeorm";

export class CreatePrestamoDto {
    // @ApiProperty()
    // @Column('text',{
    //    name: 'user', 
    //    nullable: false
    // })
    // user: string;

    @ApiProperty()
    @Column('numeric',{
        name: 'valor_prestamo',
        nullable: false
    })
    valor_prestamo: number;

    @ApiProperty()
    @Column('numeric',{
        name: 'intereses',
        nullable: false
    })
    intereses: number;

    @ApiProperty()
    @Column('numeric',{
        name: 'dias',
        nullable: false
    })
    dias: number;

    @ApiProperty()
    @Column('date',{
        name: 'fecha',
        nullable: false
    })
    fecha: Date;

    @ApiProperty()
    @Column('text',{
        name: 'estado',
        nullable: false
    })
    estado: string;

    @ApiProperty()
    @Column('numeric',{
        name: 'valor_total',
        nullable: false
    })
    valor_total: number;
}

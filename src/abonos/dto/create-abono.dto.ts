import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { Prestamo } from "src/prestamo/entities/prestamo.entity";

export class CreateAbonoDto {

    @ApiProperty()
    @IsString()
    prestamo: Prestamo

    @ApiProperty()
    @IsNumber()
    valor_abono: number

    
}

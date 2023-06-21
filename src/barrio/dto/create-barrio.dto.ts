import { IsString, MinLength } from "class-validator";

export class CreateBarrioDto {

    @IsString()
    @MinLength(1)
    nombre_barrio: string
}

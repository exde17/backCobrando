import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";
import { NombreRutas } from "../utils/nombre.enum";
import { User } from "src/auth/entities/user.entity";

export class CreateRutaDto {
  
    @ApiProperty()
    @IsArray()
    readonly barrio: string[]

    @ApiProperty()
    @IsString()
    readonly nombre: NombreRutas;

    @ApiProperty()
    @IsString()
    readonly user: User
}

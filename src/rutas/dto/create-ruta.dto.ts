import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString, IsUUID } from "class-validator";
import { NombreRutas } from "../utils/nombre.enum";
import { User } from "src/auth/entities/user.entity";

export class CreateRutaDto {
  
    @ApiProperty()
    @IsArray()
    readonly barrio: string[]

    @ApiProperty()
    @IsString()
    readonly nombre: string;

    @ApiProperty()
    @IsString()
    readonly user: User

    // @ApiProperty()
    // @IsUUID() // Agrega esta validación para asegurarte de que sea un UUID válido
    // readonly user: string;
}

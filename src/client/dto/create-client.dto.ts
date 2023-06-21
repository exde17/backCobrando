import { IsEmail, IsString, MinLength } from "class-validator";
import { Ruta } from "src/rutas/entities/ruta.entity";

export class CreateClientDto {

    @IsString()
    @MinLength(1)
    fullName: string;

    @IsString()
    @MinLength(5)
    documento: string;

    @IsString()
    @MinLength(7)
    telefono: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(1)
    direccion: string;

    @IsString()
    @MinLength(7)
    telefonoFamiliar: string;

    @IsString()
    ruta: Ruta;
}

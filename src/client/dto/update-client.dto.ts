import { PartialType } from '@nestjs/swagger';
import { CreateClientDto } from './create-client.dto';
import { IsBoolean, IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { Ruta } from 'src/rutas/entities/ruta.entity';

export class UpdateClientDto {
    @IsString()
    @MinLength(1)
    @IsOptional()
    fullName?: string;

    @IsString()
    @MinLength(5)
    @IsOptional()
    documento?: string;

    @IsString()
    @MinLength(7)
    @IsOptional()
    telefono?: string;

    @IsString()
    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    direccion?: string;

    @IsString()
    @MinLength(7)
    @IsOptional()
    telefonoFamiliar?: string;

    @IsString()
    @IsOptional()
    ruta?: Ruta; 

    @IsBoolean()
    @IsOptional()
    estado?: boolean
}

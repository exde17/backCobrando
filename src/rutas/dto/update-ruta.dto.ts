import { PartialType } from '@nestjs/mapped-types';
import { CreateRutaDto } from './create-ruta.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { NombreRutas } from '../utils/nombre.enum';
import { User } from 'src/auth/entities/user.entity';

export class UpdateRutaDto{
    @ApiProperty()
    @IsArray()
    @IsOptional()
    readonly barrio?: string[]

    @ApiProperty()
    @IsString()
    @IsOptional()
    readonly nombre?: NombreRutas;

    @ApiProperty()
    @IsString()
    @IsOptional()
    readonly user?: User
}

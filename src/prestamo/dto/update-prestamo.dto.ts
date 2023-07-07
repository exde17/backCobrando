import { PartialType } from '@nestjs/mapped-types';
import { CreatePrestamoDto } from './create-prestamo.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Client } from 'src/client/entities/client.entity';

export class UpdatePrestamoDto {
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    valor_prestamo?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    intereses?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    dias?: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    client?: Client
}

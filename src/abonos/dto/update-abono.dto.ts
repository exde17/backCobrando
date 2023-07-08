import { PartialType } from '@nestjs/mapped-types';
import { CreateAbonoDto } from './create-abono.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Prestamo } from 'src/prestamo/entities/prestamo.entity';

export class UpdateAbonoDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    prestamo?: Prestamo;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    valor_abono?: number;
}

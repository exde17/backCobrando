import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreatePersonaDto {
  @IsString()
  @MinLength(1)
  nombre1: string;

  @IsString()
  @MinLength(1)
  nombre2: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  documento: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  telefono?: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  edad?: number;

  @IsString()
  @MinLength(1)
  apellido1: string;

  @IsString()
  @MinLength(1)
  apellido2?: string;

  @IsString()
  @MinLength(1)
  direccion: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  telefonoFamiliar: number;
}

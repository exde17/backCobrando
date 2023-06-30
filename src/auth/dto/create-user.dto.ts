import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @IsString()
  @MinLength(1)
  fullName: string;

  @IsString()
  @MinLength(1)
  documento: string;

  @IsString()
  @MinLength(1)
  telefono: string;

  @IsString()
  @MinLength(1)
  edad: string;

  @IsString()
  @MinLength(1)
  direccion: string;

  @IsString()
  @MinLength(1)
  telefonoFamiliar: string;

  @IsArray()
  @IsString({ each: true })// valida cada elemento del array que se un string
  roles: string[];
}

export class UpdateUserDto{
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @IsOptional()
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password?: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  fullName?: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  documento?: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  telefono?: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  edad?: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  direccion?: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  telefonoFamiliar?: string;

  @IsArray()
  @IsString({ each: true })// valida cada elemento del array que se un string
  @IsOptional()
  roles?: string[];
}

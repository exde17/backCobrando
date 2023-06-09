import {
  IsEmail,
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
}

import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDecimal, IsNumber, IsString } from "class-validator";
import { UUID } from "crypto";
import { User } from "src/auth/entities/user.entity";
import { Client } from "src/client/entities/client.entity";
import { Column } from "typeorm";

export class CreatePrestamoDto {
    

    @ApiProperty()
    @IsNumber()
    valor_prestamo: number;

    @ApiProperty()
    @IsNumber()
    intereses: number;

    @ApiProperty()
    @IsNumber()
    dias: number;

    @ApiProperty()
    @IsString()
    client: Client
}

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBarrioDto } from './create-barrio.dto';
import { IsString } from 'class-validator';

export class UpdateBarrioDto {
    @ApiProperty()
    @IsString()
    nombre_barrio: string
}

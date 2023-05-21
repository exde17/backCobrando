import { PartialType } from '@nestjs/mapped-types';
import { CreateCobradorDto } from './create-cobrador.dto';

export class UpdateCobradorDto extends PartialType(CreateCobradorDto) {}

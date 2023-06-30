import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { BarrioService } from './barrio.service';
import { CreateBarrioDto } from './dto/create-barrio.dto';
import { UpdateBarrioDto } from './dto/update-barrio.dto';
import { Auth, ValidRoles } from 'src/auth/interfaces';

@Controller('barrio')
export class BarrioController {
  constructor(private readonly barrioService: BarrioService) {}

  //crear barrio
  @Post()
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  create(@Body() createBarrioDto: CreateBarrioDto) {
    return this.barrioService.create(createBarrioDto);
  }

  //traer todos los barrios
  @Get()
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  findAll() {
    return this.barrioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.barrioService.findOne(+id);
  }

  @Patch('updateBarrio/:id')
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateBarrioDto: UpdateBarrioDto) {
    return this.barrioService.update(id, updateBarrioDto);
  }

  @Delete('eliminar/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.barrioService.remove(id);
  }
}

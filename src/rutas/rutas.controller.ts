import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { RutasService } from './rutas.service';
import { CreateRutaDto } from './dto/create-ruta.dto';
import { UpdateRutaDto } from './dto/update-ruta.dto';
import { Auth, ValidRoles } from 'src/auth/interfaces';

@Controller('rutas')
export class RutasController {
  constructor(private readonly rutasService: RutasService) {}

  //crear ruta
  @Post()
  @Auth(ValidRoles.admin, ValidRoles.superUser, ValidRoles.cobrador)
  async create(@Body() createRutaDto: CreateRutaDto) {
    return await this.rutasService.create(createRutaDto); 
  }

  //llamar a todas las rutas
  @Get()
  @Auth(ValidRoles.admin, ValidRoles.superUser, ValidRoles.cobrador)
  findAll() {
    return this.rutasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rutasService.findOne(+id);
  }

  //actualizar rutas
  @Patch('update/:id')
  @Auth(ValidRoles.admin, ValidRoles.superUser, ValidRoles.cobrador)
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateRutaDto: UpdateRutaDto) {
    return await this.rutasService.update(id, updateRutaDto);
  }

  //actualizar estado de la ruta
  @Patch('updateEstado/:id')
  @Auth(ValidRoles.admin, ValidRoles.superUser, ValidRoles.cobrador)
  async updateEstado(@Param('id', ParseUUIDPipe) id: string) {
    return await this.rutasService.updateEstado(id);
  }
}

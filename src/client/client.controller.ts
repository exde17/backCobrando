import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Req } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Validate } from 'class-validator';
import { Auth, ValidRoles } from 'src/auth/interfaces';
import { Request } from 'express';
import { User } from '../auth/entities/user.entity';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @Auth(ValidRoles.admin, ValidRoles.superUser, ValidRoles.cobrador)
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);  
  }

  //trae los clientes que estan relacionados a la ruta que tiene asignada el cobrador
  @Get('cliente')
  @Auth(ValidRoles.admin, ValidRoles.superUser, ValidRoles.cobrador)
  async findClientesCobrador(
    @Req() request: Request) {
      const user = request.user
    return await this.clientService.findClientesCobrador(user);
  }

  @Get()
  @Auth(ValidRoles.admin, ValidRoles.superUser, ValidRoles.cobrador)
  async findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  @Auth(ValidRoles.admin, ValidRoles.superUser, ValidRoles.cobrador)
  async findOne(@Param('id') id: string) {
    return this.clientService.findOne(id);
  }

  @Patch('updateClient/:id')
  @Auth(ValidRoles.admin, ValidRoles.superUser, ValidRoles.cobrador)
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(id, updateClientDto);
  }

  //sera mejor actualizar el estado de cliente para que quede inactivo
  @Delete('delete/:id')
  @Auth(ValidRoles.admin, ValidRoles.superUser, ValidRoles.cobrador)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.clientService.remove(id);
  }

  
}

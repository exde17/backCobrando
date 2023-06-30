import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Validate } from 'class-validator';
import { Auth, ValidRoles } from 'src/auth/interfaces';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @Auth(ValidRoles.admin, ValidRoles.superUser, ValidRoles.cobrador)
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);  
  }

  @Get()
  @Auth(ValidRoles.admin, ValidRoles.superUser, ValidRoles.cobrador)
  async findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  @Auth(ValidRoles.admin, ValidRoles.superUser, ValidRoles.cobrador)
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
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

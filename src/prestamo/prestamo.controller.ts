import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { PrestamoService } from './prestamo.service';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
import { User } from 'src/auth/entities/user.entity';
import { Request } from 'express';
// import { AuthGuard } from '../auth.guard';
import * as request from 'supertest';
import { AuthGuard } from '@nestjs/passport';
import { Auth, ValidRoles } from 'src/auth/interfaces';



@Controller('prestamo')
export class PrestamoController {
  constructor(private readonly prestamoService: PrestamoService) {}



  @Post()
  @Auth(ValidRoles.user)
  async create(@Body() createPrestamoDto: CreatePrestamoDto) {
    return await this.prestamoService.create(createPrestamoDto); 
  }

  @Get('full')
  @Auth(ValidRoles.superUser)
  beat(@Req() request: Express.Request) {
    
    return {
      ok: true,
      message: 'hola a todos',
      user: { name: 'mario'}

    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prestamoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrestamoDto: UpdatePrestamoDto) {
    return this.prestamoService.update(+id, updatePrestamoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prestamoService.remove(+id);
  }
}
function GetUser(): (target: PrestamoController, propertyKey: "create", parameterIndex: 0) => void {
  throw new Error('Function not implemented.');
}


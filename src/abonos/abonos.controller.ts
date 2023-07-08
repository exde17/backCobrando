import { Controller, Get, Post, Body, Patch, Param, Delete, Req, ParseUUIDPipe } from '@nestjs/common';
import { AbonosService } from './abonos.service';
import { CreateAbonoDto } from './dto/create-abono.dto';
import { UpdateAbonoDto } from './dto/update-abono.dto';
import { Request } from 'express';
import { Auth } from 'src/auth/interfaces';
import { ValidRoles } from '../auth/interfaces/valid-role';

@Controller('abonos')
export class AbonosController {
  constructor(private readonly abonosService: AbonosService) {}

  @Post()
  @Auth(ValidRoles.admin, ValidRoles.cobrador, ValidRoles.superUser)
  async create(
    @Body() createAbonoDto: CreateAbonoDto, 
  @Req() request: Request,
  ) {
    const user= request.user;
    return await this.abonosService.create(createAbonoDto,user);
  }

  @Get()
  findAll() {
    return this.abonosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.abonosService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateAbonoDto: UpdateAbonoDto) {
    return this.abonosService.update(id, updateAbonoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.abonosService.remove(+id);
  }
}

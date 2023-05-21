import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CobradorService } from './cobrador.service';
import { CreateCobradorDto } from './dto/create-cobrador.dto';
import { UpdateCobradorDto } from './dto/update-cobrador.dto';

@Controller('cobrador')
export class CobradorController {
  constructor(private readonly cobradorService: CobradorService) {}

  @Post()
  create(@Body() createCobradorDto: CreateCobradorDto) {
    return this.cobradorService.create(createCobradorDto);
  }

  @Get()
  findAll() {
    return this.cobradorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cobradorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCobradorDto: UpdateCobradorDto) {
    return this.cobradorService.update(+id, updateCobradorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cobradorService.remove(+id);
  }
}

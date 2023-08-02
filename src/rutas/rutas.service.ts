import { Injectable } from '@nestjs/common';
import { CreateRutaDto } from './dto/create-ruta.dto';
import { UpdateRutaDto } from './dto/update-ruta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ruta } from './entities/ruta.entity';
import { Repository } from 'typeorm';
import { EstadoEnum } from './utils/estado.enum';

@Injectable()
export class RutasService {

  constructor(
    @InjectRepository(Ruta) private readonly rutaRepository: Repository<Ruta>,
  
  ){}

  //crear ruta
 async create(createRutaDto: CreateRutaDto) {
    try {
      const ruta = this.rutaRepository.create(createRutaDto)

      const res = await this.rutaRepository.save(ruta)

      return 'ruta creada con exito'
    } catch (error) {
      return ('error al crear la ruta: '+ error)
      
    }
  }

  //llamar todas las rutas
  async findAll() {
    try {
      return await this.rutaRepository.find({
        relations: ['user'],
        select:{
          user:{'fullName': true}
        }
      })
    } catch (error) {
      return ('error pelao: '+error)
    }
    
  }

  findOne(id: number) {
    return `This action returns a #${id} ruta`;
  }

  //actualizar rutas
  async update(id: string, updateRutaDto: UpdateRutaDto) {
    try {
      const ruta = this.rutaRepository.create({
        ...updateRutaDto,
      })
      const res = await this.rutaRepository.update(id, ruta)
      return 'ruta actualizada con exito'
    } catch (error) {
      return ('error al actualizar la ruta: '+ error)
      
    }
  }

  //actualizar estado de la ruta
  async updateEstado(id: string) {
    try {
      const ruta = await this.rutaRepository.findOne({
        where: {
          id
        }
      })

      if(ruta){
        if(ruta.estado == 'ACTIVO'){
          ruta.estado = EstadoEnum.IINACTIVO
        }else{
          ruta.estado = EstadoEnum.ACTIVO
        }
      }else{
        return 'ruta no encontrada'
      }
      const res = await this.rutaRepository.save(ruta)

      return 'estado actualizado con exito'
    } catch (error) {
      return ('estado no actualizado: '+error)
    }
    
  }
}

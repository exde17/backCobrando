import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateBarrioDto } from './dto/create-barrio.dto';
import { UpdateBarrioDto } from './dto/update-barrio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Barrio } from './entities/barrio.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class BarrioService {

  //CAPTURAR LOS ERRORES
  private capturarError(error: any) {
    if (error.code == '23505') {
      throw new BadRequestException(error.detail);

      console.log(error);

      throw new InternalServerErrorException('revisar el servidor');
    }
  }

  constructor(
    @InjectRepository(Barrio)
    private readonly barrioRepository: Repository<Barrio>,
    private jwtService: JwtService,
  
  ){}

  //crear un barrio
  async create(createBarrioDto: CreateBarrioDto) {
    try {
      const barrio = this.barrioRepository.create(createBarrioDto)
      const res= await this.barrioRepository.save(barrio)
      console.log(res)
      return 'el barrio fue creado con exito'
    } catch (error) {
      this.capturarError(error)
    }
    
  }

  //listar todos los barrios
  findAll() {
    const barrio = this.barrioRepository.find()
    return barrio
  }

  findOne(id: number) {
    return `This action returns a #${id} barrio`;
  }

  //actualizar barrio
  async update(id: string, updateBarrioDto: UpdateBarrioDto) {

    try {
      const barrio = this.barrioRepository.create({
        ...updateBarrioDto
      })
  
      const res= await this.barrioRepository.update(id,barrio)
      console.log(res)
      return 'el barrio fue actualizado con exito'
    } catch (error) {
      this.capturarError(error)
      
    }
    
  }

  async remove(id: string) {
    const barrio = await this.barrioRepository.delete(id)
    console.log(barrio)
    return 'el barrio fue borrado con exito'
  }
}

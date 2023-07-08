import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAbonoDto } from './dto/create-abono.dto';
import { UpdateAbonoDto } from './dto/update-abono.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Abono } from './entities/abono.entity';
import { Repository } from 'typeorm';
import { Prestamo } from 'src/prestamo/entities/prestamo.entity';

@Injectable()
export class AbonosService {
  constructor(
    @InjectRepository(Abono)private readonly abonoRepository: Repository<Abono>,
    @InjectRepository(Prestamo)private readonly prestamoRepository: Repository<Prestamo>
  
  ){}

  //crear abono
  async create(createAbonoDto: CreateAbonoDto, user: any) {
    try {

      const { valor_abono } = createAbonoDto //datos que pienso enviar para crear el abono
      const { prestamo } = createAbonoDto //datos existentes en prestamo
      
      const prestamoId = prestamo.id
      const prestamoValor = prestamo.valor_prestamo

      const prest = await this.prestamoRepository.findOne({
        where:{ id: prestamoId } 
      })

      if(!prest){
        throw new NotFoundException('El préstamo no existe')
      }

      //le restamos el valor del abono al prestamo
      if( valor_abono > prestamoValor){
        throw new NotFoundException(`el valor del abono excede el valor que debe. deuda:${prest.valor_prestamo}`)
      }else{
        prest.valor_prestamo = prest.valor_prestamo - valor_abono
      }
      console.log('usuario: ',user)
      //creamos el abono
      const abono = this.abonoRepository.create({
        ...createAbonoDto,
        "user": user
      })
      const res= await this.abonoRepository.save(abono);

      //actualizo el valor del prestamo
      const prestamoActualizado = await this.prestamoRepository.save(prest)

      return `abono creado con exito. sedebe del prestamo: ${prestamoActualizado.valor_prestamo}`
    } catch (error) {
      
    }
  }

  findAll() {
    return `This action returns all abonos`; 
  }

  findOne(id: number) {
    return `This action returns a #${id} abono`;
  }

  //actualizar abono
  async update(id: string, updateAbonoDto: UpdateAbonoDto) {
    try {
      //verifico que exista el abono
      const abono = await this.abonoRepository.findOne({
        relations:['prestamo'],
        where:{ id }
      })

      if(!abono){
        throw new NotFoundException('El abono no existe')
      }

      let prestamoId = abono.prestamo.id //busco el id del prestamo
      let valorAbono = Number(abono.valor_abono) //busco el valor del abono

      //busco el prestamo
      let prest = await this.prestamoRepository.findOne({
        where:{ id: prestamoId }
      })

      //verifico el prestamo solo para poder sacar la cuenta y actualizar el abono y el valor del prestamo en prestamo
      if(prest){
        
        prest.valor_prestamo = Number(prest.valor_prestamo) + valorAbono;
        
        if(updateAbonoDto.valor_abono > prest.valor_prestamo){
          throw new NotFoundException(`el valor del abono excede el valor que debe. deuda:${prest.valor_prestamo}`)
        }else{
          prest.valor_prestamo = prest.valor_prestamo - updateAbonoDto.valor_abono
          abono.valor_abono = updateAbonoDto.valor_abono
        }
        
        await this.abonoRepository.save(abono)
        await this.prestamoRepository.save(prest)
      }

      return `valor de abono actualizado. el prestamo quedo en: ${prest.valor_prestamo}`

    } catch (error) {
      throw new HttpException('error al actualizar el abono', HttpStatus.NOT_FOUND);
    }
  }

  remove(id: number) {
    //TODO: cuando se valla a eliminar es mejor poner un estado y poder ver el usuario que lo hizo y una observacion por que lo hizo
    return `This action removes a #${id} abono`;
  }
}

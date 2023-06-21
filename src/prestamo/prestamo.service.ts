import { Injectable } from '@nestjs/common';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
import { Prestamo } from './entities/prestamo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class PrestamoService {
  constructor(
    @InjectRepository(Prestamo)
    private readonly prestamoRepository: Repository<Prestamo>,
  ) { }
  

  async create(createPrestamoDto: CreatePrestamoDto) { 
    // try {
    //   const prestamo = this.prestamoRepository.create({
    //     ...createPrestamoDto,
       
    //   })
    //   await this.prestamoRepository.save(prestamo)
      
    // } catch (error) {
      
    // }
    return 'elegante'
  }

  findAll() {
    return `This action returns all prestamo rr`;
  }

  findOne(id: number) {
    return `This action returns a #${id} prestamo`;
  }

  update(id: number, updatePrestamoDto: UpdatePrestamoDto) {
    return `This action updates a #${id} prestamo`;
  }

  remove(id: number) {
    return `This action removes a #${id} prestamo`;
  }
}

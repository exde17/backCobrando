import { Injectable } from '@nestjs/common';
import { CreateBarrioDto } from './dto/create-barrio.dto';
import { UpdateBarrioDto } from './dto/update-barrio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Barrio } from './entities/barrio.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class BarrioService {

  constructor(
    @InjectRepository(Barrio)
    private readonly barrioRepository: Repository<Barrio>,
    private jwtService: JwtService,
  
  ){}

  async create(createBarrioDto: CreateBarrioDto) {
    const barrio = this.barrioRepository.create(createBarrioDto)
    return await this.barrioRepository.save(barrio)
  }

  findAll() {
    return `This action returns all barrio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} barrio`;
  }

  update(id: number, updateBarrioDto: UpdateBarrioDto) {
    return `This action updates a #${id} barrio`;
  }

  remove(id: number) {
    return `This action removes a #${id} barrio`;
  }
}

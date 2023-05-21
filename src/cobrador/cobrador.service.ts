import { Injectable } from '@nestjs/common';
import { CreateCobradorDto } from './dto/create-cobrador.dto';
import { UpdateCobradorDto } from './dto/update-cobrador.dto';

@Injectable()
export class CobradorService {
  create(createCobradorDto: CreateCobradorDto) {
    return 'This action adds a new cobrador';
  }

  findAll() {
    return `This action returns all cobrador`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cobrador`;
  }

  update(id: number, updateCobradorDto: UpdateCobradorDto) {
    return `This action updates a #${id} cobrador`;
  }

  remove(id: number) {
    return `This action removes a #${id} cobrador`;
  }
}

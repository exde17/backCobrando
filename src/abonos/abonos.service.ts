import { Injectable } from '@nestjs/common';
import { CreateAbonoDto } from './dto/create-abono.dto';
import { UpdateAbonoDto } from './dto/update-abono.dto';

@Injectable()
export class AbonosService {
  create(createAbonoDto: CreateAbonoDto) {
    return 'This action adds a new abono';
  }

  findAll() {
    return `This action returns all abonos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} abono`;
  }

  update(id: number, updateAbonoDto: UpdateAbonoDto) {
    return `This action updates a #${id} abono`;
  }

  remove(id: number) {
    return `This action removes a #${id} abono`;
  }
}

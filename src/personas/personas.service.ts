import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { Repository } from 'typeorm';
import { Persona } from './entities/persona.entity';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { take } from 'rxjs';

@Injectable()
export class PersonasService {
  private readonly logger = new Logger('PersonasService');

  constructor(
    @Inject('PersonaRepository')
    private readonly personaRepository: Repository<Persona>,
  ) {}

  async create(createPersonaDto: CreatePersonaDto) {
    // return 'This action adds a new persona';
    try {
      const newPersona = this.personaRepository.create(createPersonaDto);
      return await this.personaRepository.save(newPersona);
    } catch (error) {
      // console.log(error);
      this.captarErrores(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.personaRepository.find({
      take: limit, //toma la cantidad que estoy especificando en el limite
      skip: offset, //salta todos los que diga este offset
    });
  }

  async findOne(id: string) {
    const person = await this.personaRepository.findOneBy({ id });
    if (!person) throw new NotFoundException('persona no encontrada');
    return person;
  }

  async update(id: string, updatePersonaDto: UpdatePersonaDto) {
    const Person = await this.personaRepository.preload({
      id: id,
      ...updatePersonaDto,
    });
    if (!Person) throw new NotFoundException(`el producto ${id} no existe`);

    try {
      await this.personaRepository.save(Person);
      return Person;
    } catch (error) {}
    console.error('no actualizo');
  }

  async remove(id: string) {
    const ePerson = await this.personaRepository.findOneBy({ id });
    if (!ePerson) throw new NotFoundException('persona no encontrada');
    await this.personaRepository.remove(ePerson);
    return `This action removes a #${id} persona`;
  }

  private captarErrores(error: any) {
    if (error.code === '23505')
      throw new InternalServerErrorException(
        'Documento ya existe' + error.detail,
      );

    this.logger.error(error);
    throw new InternalServerErrorException('Ayuda');
  }
}

import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Ruta } from 'src/rutas/entities/ruta.entity';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class ClientService {

  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private jwtService: JwtService,
  ){

  }
  async create(createClientDto: CreateClientDto) {
    try {
      const client = this.clientRepository.create(createClientDto);
      return await this.clientRepository.save(client);

    } catch (error) {
      this.capturarError(error);
      
    }
  }
  capturarError(error: any) {
    throw new Error('Method not implemented.');
  }

  async findAll() {
    const client = await this.clientRepository.find({
      relations: ['ruta'],
      select:{ ruta: {id:true} }
    })
    return client
  }

  async findOne(id: string) {
    return await this.clientRepository.findOne({
      relations: ['ruta'],
      where: { id },
    });
  }

  async update(id: string, updateClientDto: UpdateClientDto) {

    try {
      const client = this.clientRepository.create({
        ...updateClientDto
      })
  
      const res = await this.clientRepository.update(id, client)
      return 'cliente actualizado con exito'
    } catch (error) {
      return error
    }
    
  }

  async remove(id: string) {
    const client = await this.clientRepository.delete(id)
    return 'cliente eliminado exitosamente'
  }

  //trae los clientes que estan relacionados a la ruta que tiene asignada el cobrador
  async findClientesCobrador(user: any) {
    const client = await this.clientRepository
    .createQueryBuilder('client')
    .leftJoinAndSelect('client.ruta', 'ruta')
    .where('ruta.user = :user', { user: user.id })
    .getMany();
    return client
    // return user.id
  }
}

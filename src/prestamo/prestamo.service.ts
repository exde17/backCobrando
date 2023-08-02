import { Injectable, ParseUUIDPipe } from '@nestjs/common';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
import { Prestamo } from './entities/prestamo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as moment from 'moment';
import { User } from 'src/auth/entities/user.entity';
import { Estado } from './utils/estado.enum';
import { EstadoEnum } from 'src/rutas/utils/estado.enum';
// import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PrestamoService {
  constructor(
    @InjectRepository(Prestamo) private readonly prestamoRepository: Repository<Prestamo>, 
  ) { }
  

  async create(createPrestamoDto: CreatePrestamoDto, user: any) { 
    try {

      const { valor_prestamo, intereses, dias } = createPrestamoDto
      
      // Verificar si el cliente ya tiene un préstamo activo
      
      const prestamoActivo = await this.prestamoRepository
      .createQueryBuilder('prestamo')
      .where('prestamo.client.id = :clientI', { clientI: createPrestamoDto.client })
      .andWhere('prestamo.estado = :estado', { estado: Estado.ACTIVO })
      .getOne();

      if (prestamoActivo) {
        throw new Error('El cliente ya tiene un préstamo activo');
      }

        //aqui obtenemos la fecha y le sumamos el numero de dias en que van a pagar y la formatiamos
        const nuevaEntidad = new Prestamo();
        const fec= nuevaEntidad.fecha = moment().add(30, 'days').toDate();
        const soloFecha = fec.toLocaleDateString('en-US');
        const [month, day, year] = soloFecha.split('/');
        const fechaFormateada = `${month.padStart(2, '0')}/${day.padStart(2, '0')}/${year}`;
        

        const valor_intereses = (valor_prestamo * intereses)/100
        
        const valor_total = valor_prestamo + valor_intereses
        
        const valor_cuotas = valor_total / dias

        
      const prestamo = this.prestamoRepository.create({
        ...createPrestamoDto, 
        "valor_total": valor_total, 
        "valor_cuotas": valor_cuotas,
        "fecha": fec,
        "user": user
      })
       const res = await this.prestamoRepository.save(prestamo)

       //formateamos la fecha de inicio del prestamo
        const fechaInicio = res.createAt.toLocaleDateString('en-US');
        const [monthInicio, dayInicio, yearInicio] = fechaInicio.split('/');
        const fechaInicioFormateada = `${monthInicio.padStart(2, '0')}/${dayInicio.padStart(2, '0')}/${yearInicio}`;

       return [{
        "valor_total": valor_total,
        "valor_cuotas": valor_cuotas,
        "fechaLimite": fechaFormateada,
        "fechaInicial": fechaInicioFormateada,
        "numero_cuotas": dias
       }] 
    } catch (error) {
      return ('error al crear el prestamo: '+ error)
    }
        
  }


  findOne(id: string) {
    try {
      return this.prestamoRepository.findOne({
        where: { id: id },
      })
    } catch (error) {
      throw new Error('El prestamo no existe'+ error);
    }
    
    
  }

  //actualizar prestamo
  async update(id: string, updatePrestamoDto: UpdatePrestamoDto) {
    try {
      let prest
      const { valor_prestamo, intereses, dias } = updatePrestamoDto
      
      // Verificar si el cliente ya tiene un préstamo activo
      if(updatePrestamoDto.client){ //verifico si se quiere actualizar el cliente
         prest = await this.prestamoRepository
        .createQueryBuilder('prestamo')
        .where('prestamo.id <> :id', { id: id })
        .andWhere('prestamo.client.id = :clientId', { clientId: updatePrestamoDto.client })
        .andWhere('prestamo.estado = :estado', { estado: Estado.ACTIVO })
        .getOne();

        if (prest) {//si tiene prestamo activo no lo deja actualizar debe ser otro cliente
          throw new Error('El cliente ya tiene un préstamo activo');
        }else{ // si no tine traemos el prestamo y usamos lo que necesitamos
          prest = await this.prestamoRepository.findOne({
            where: { id: id },
          })
        }
      }else{
        prest = await this.prestamoRepository.findOne({
          where: { id: id },
        })
      }
      
      //las condiciones de los datos a actualizar y su logica
        let valor_prestamo2 = prest.valor_prestamo
        let intereses2 = prest.intereses
        let dias2 = prest.dias

        if (valor_prestamo){
          valor_prestamo2 = valor_prestamo
        }

        if (intereses){
          intereses2 = intereses
        }

        if (dias){
          dias2 = dias
        }
        console.log('1: ',valor_prestamo2)
        console.log('2: ',intereses2)
        console.log('3: ',dias2)
      
        const valor_intereses = (valor_prestamo2 * intereses2)/100
        const valor_total = valor_prestamo2 + valor_intereses
        const valor_cuotas = valor_total / dias2

      const prestamo = this.prestamoRepository.create({
        ...updatePrestamoDto, 
        "valor_total": valor_total, 
        "valor_cuotas": valor_cuotas,
      })
       const res = await this.prestamoRepository.update(id,prestamo)

       return [{
        "valor_total": valor_total,
        "valor_cuotas": valor_cuotas,
        "numero_cuotas": dias
       }] 
    } catch (error) {
      return ('error al crear el prestamo: '+ error)
    }
    
  }

  //cambiar estado del prestamo
  async updateEstado(id: string) {
    
    try {
      const prest = await this.prestamoRepository.findOne({
        where: { id },
      })

      if( prest){
        if(prest.estado == 'ACTIVO'){
          prest.estado = Estado.INACTIVO
        }else{
          prest.estado = Estado.ACTIVO
        }
      }else{
        throw new Error('El prestamo no existe');
      }
      const prestamo = this.prestamoRepository.save(prest)
      return `el estado cambio exitosamente a ${prest.estado}`
    }
     catch (error) {
      return ('error al cambiar el estado del prestamo: '+ error)
      
    }
  } 

  //traer todo
  async findAllPrestamos() {
    try {
      const prestamos = await this.prestamoRepository.find({
        relations: ['client'],
      })
      return prestamos
    } catch (error) {
      return ('error al traer los prestamos: '+ error)
    }
  }

  //traer los prestamos que relacionan al cobrador
  async findPrestamosCobrador(id: string) {
    try {
      const prestamos = await this.prestamoRepository.find({
        where: { user:{ id } },
        relations: ['client'],
      })
      return prestamos
    } catch (error) {
      return ('error al traer los prestamos: '+ error)
    }
  }

  //traer los prestamos que relacionan al cobrador. este es para el cobrador
  async findPrestamosCobrador2(user: any) {
    try {
      
      const prestamos = await this.prestamoRepository.find({
        where: { user:user },
        relations: ['client'],
      })
      return prestamos
    } catch (error) {
      return ('error al traer los prestamos: '+ error)
    }
  }
}

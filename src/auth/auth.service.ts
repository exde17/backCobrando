import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { jwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  //REGISTRO USER
  async createUser(createUserDto: CreateUserDto) {
    try {
      // destructurar los datos del createUserDto
      const { password, ...userData } = createUserDto;
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      await this.userRepository.save(user);
      delete user.password;

      return ({
        ...user,
        token: this.getjwtToken({ id: user.id }),
      }) 
    } catch (error) {
      this.capturarError(error);
    }
  }

  //LOGIN
  async loginUser(loginUserDto: LoginUserDto) {
    // try {
    const { password, email } = loginUserDto

    const user = await this.userRepository.findOne({
      where: { email },
      select: {
        email: true,
        password: true,
        id: true,
      },
    });

    if (!user) throw new UnauthorizedException('el email no existe');

    if (!bcrypt.compareSync(loginUserDto.password, user.password))
      throw new UnauthorizedException('el password no es correcto');

    return ({
      id: user.id,
      email: user.email,
      token: this.getjwtToken({ id: user.id }),
    })  

  }

  //CAPTURAR LOS ERRORES
  private capturarError(error: any) {
    if (error.code == '23505') {
      throw new BadRequestException(error.detail);

      console.log(error);

      throw new InternalServerErrorException('revisar el servidor');
    }
  }

  //LISTAR TODOS LOS USUARIOS
  findAll(paginationDto: PaginationDto) {
    const { limit = 2, offset = 0 } = paginationDto;
    return this.userRepository.find({
      take: limit, //toma la cantidad que estoy especificando en el limite
      skip: offset, //salta todos los que diga este offset
    });
  }

  private getjwtToken( payload: jwtPayload){
    const token = this.jwtService.sign( payload );
    return token;
  }

  //actualizar usuario
  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user= this.userRepository.create({
        ...updateUserDto,
      })

      await this.userRepository.update(id, user);
      return 'usuario actualizado con exito'
      
    } catch (error) {
      return error
    }
  }
}

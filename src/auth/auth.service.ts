import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

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

      // return user;
      return {
        ...user,
        token: await this.jwtService.signAsync({ ...user }),
      };
    } catch (error) {
      this.capturarError(error);
    }
  }

  //LOGIN
  async loginUser(loginUserDto: LoginUserDto) {
    // try {
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
      select: {
        email: true,
        password: true,
        fullName: true,
        documento: true,
        telefono: true,
        direccion: true,
        roles: true,
        telefonoFamiliar: true,
        isActive: true,
      },
    });

    if (!user) throw new UnauthorizedException('el email no existe');

    if (!bcrypt.compareSync(loginUserDto.password, user.password))
      throw new UnauthorizedException('el password no es correcto');

    const payload = {
      fullName: user.fullName,
      documento: user.documento,
      telefono: user.telefono,
      direccion: user.direccion,
      roles: user.roles,
      telefonoFamiliar: user.telefonoFamiliar,
      isActive: user.isActive,
      email: user.email,
    };
    // return {
    //   access_token: await this.jwtService.signAsync(payload),
    // };
    const toke = await this.jwtService.signAsync(payload); // OBTENGO EL TOKEN

    const decodedToken = this.jwtService.verify(toke); // DESCIFRAR INFO DEL TOKEN

    return {
      access_token: toke,
      decodedToken,
    };
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
}

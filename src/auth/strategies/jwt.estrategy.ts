import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../entities/user.entity';
import { jwtPayload } from '../interfaces/jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { JwtStrategy } from './jwt.estrategy';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }


    async validate(payload: jwtPayload): Promise<User>{
        const {id} = payload

        const user = await this.userRepository.findOneBy({
            id
        })

        if (!user){
            throw new UnauthorizedException('token no es valido')
        }

        if(!user.isActive){
            throw new UnauthorizedException('usuario no activo')
        }

        // console.log(user);
        return user  ;
    }
}

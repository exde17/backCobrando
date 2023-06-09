import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth.guard';
import { APP_GUARD } from '@nestjs/core';
// import { jwtConstants } from './constants';

@Module({
  controllers: [AuthController],
  providers: [AuthService,{
    provide: APP_GUARD,
    useClass: AuthGuard,
  },],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [],
      inject: [],
      useFactory: async () => {
        // console.log('jwwtt: ', process.env.JWT_SECRET);
        return {
          global: true,
          secret: process.env.JWT_SECRET, //jwtConstants.secret,
          // signOptions: { expiresIn: '60s' },
          signOptions: { expiresIn: '2h' },
        };
      },

      //global: true,
      //secret: process.env.JWT_SECRET, //jwtConstants.secret,
      //signOptions: { expiresIn: '60s' },
    }),
  ],
  

  // export class AuthModule {}
  exports: [TypeOrmModule],
})

export class AuthModule {}

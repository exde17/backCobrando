import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
// import { AuthGuard } from 'src/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.estrategy';
// import { jwtConstants } from './constants';

@Module({
  controllers: [AuthController],
  providers: [AuthService,
    JwtStrategy,
  //   {
  //   provide: APP_GUARD,
  //   useClass: AuthGuard,
  // },
],
  imports: [
    TypeOrmModule.forFeature([User]),
    // DATOS NECESARIOS EN LA JSON WEB TOKEN
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // JwtModule.registerAsync({
    //   imports: [],
    //   inject: [],
    //   useFactory: async () => {
    //     return{
    //       secret: process.env.JWT_SECRET,
    //       signOptions: {
    //       expiresIn: '2h',
    //   }
    //     }
      
    // }}),
    ///////////////////////////////////////
    JwtModule.registerAsync({
      imports: [],
      inject: [],
      useFactory: async () => {
        //  console.log('jwwtt: ', process.env.JWT_SECRET);
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
  exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule],
})

export class AuthModule {}

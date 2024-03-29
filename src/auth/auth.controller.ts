import { Controller, Post, Body, Get, Query, UseGuards, Req, SetMetadata, ParseUUIDPipe, Param, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
// import { AuthGuard } from '../auth.guard';
import { Public } from '../decorations/auth.decorators'
import { AuthGuard } from '@nestjs/passport';
import { getUser } from './decorator/get-user.decorate';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guard/user-role/user-role.guard';
import { RoleProtected } from './decorator/role-protected.decorator';
import { Auth, ValidRoles } from './interfaces';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
  @Post('register')
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

   // update usuario y sirve para cambiar estado
   @Patch('update/:id')
   @Auth(ValidRoles.admin, ValidRoles.superUser)
   async updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
     return this.authService.updateUser(id, updateUserDto);
   }

  // @Get('full')
  // // @SetMetadata('roles',['admin','super-user'])
  // @RoleProtected(ValidRoles.superUser)
  // @UseGuards(AuthGuard(), UserRoleGuard)
  // beat(@getUser() user: User,
  //   @getUser('email') userEmail: string
  // ) {
  //   // console.log( user)
  //   return {
  //     ok: true,
  //     userEmail,
  //     user

  //   }
  // }

  // @Get('full2')
  // @Auth(ValidRoles.superUser)
  // beat2(@getUser() user: User,
  //   @getUser('email') userEmail: string
  // ) {
  //   // console.log( user)
  //   return {
  //     ok: true,
  //     userEmail,
  //     user

  //   }
  // }
  
  @Get('todos')
  // @UseGuards(AuthGuard())
  @Auth(ValidRoles.admin,ValidRoles.superUser)
  findAll(@Query() paginationDto: PaginationDto) {
    console.log(paginationDto);
    return this.authService.findAll(paginationDto);
  }

  //traer roles
  @Get('roles')
  @Auth(ValidRoles.admin,ValidRoles.superUser, ValidRoles.cobrador)
  getRoles() {
    return this.authService.getRoles();
  }
 
  //traer solo usuarios con rol cobrador
  @Get('cobradores')
  @Auth(ValidRoles.admin,ValidRoles.superUser)
  getCobradores() {
    return this.authService.getCobradores();
  }
}

import { Controller, Post, Body, Get, Query, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
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

  @Get('full')
  // @SetMetadata('roles',['admin','super-user'])
  @RoleProtected(ValidRoles.superUser)
  @UseGuards(AuthGuard(), UserRoleGuard)
  beat(@getUser() user: User,
    @getUser('email') userEmail: string
  ) {
    // console.log( user)
    return {
      ok: true,
      userEmail,
      user

    }
  }

  @Get('full2')
  @Auth(ValidRoles.superUser)
  beat2(@getUser() user: User,
    @getUser('email') userEmail: string
  ) {
    // console.log( user)
    return {
      ok: true,
      userEmail,
      user

    }
  }
  
  @Get('todos')
  @UseGuards(AuthGuard())
  findAll(@Query() paginationDto: PaginationDto) {
    console.log(paginationDto);
    return this.authService.findAll(paginationDto);
  }

}

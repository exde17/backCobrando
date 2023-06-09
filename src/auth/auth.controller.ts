import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
// import { AuthGuard } from '../auth.guard';
import { Public } from '../decorations/auth.decorators'


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @Public()
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  
  @Get('todos')
  findAll(@Query() paginationDto: PaginationDto) {
    console.log(paginationDto);
    return this.authService.findAll(paginationDto);
  }

}

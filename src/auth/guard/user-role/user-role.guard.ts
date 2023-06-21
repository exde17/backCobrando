import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/decorator/role-protected.decorator';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler())

    //validamos si el usuario tiene el rol requerido
    const request = context.switchToHttp().getRequest();
    const user = request.user as User;

    if (!user){
      throw new BadRequestException('usuario no existe')
    }

    for (const rol of user.roles) {
      if(validRoles.includes(rol))
        return true;
    }

    console.log({
      roluser: user.roles
    })
    throw new ForbiddenException(`usuario tiene el tipo de rol ${user.roles} y necesita el rol: [${validRoles}]`)
  }
}
